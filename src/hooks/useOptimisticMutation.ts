import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';

/**
 * 낙관적 업데이트에 사용되는 옵션 인터페이스.
 * @template TResult 뮤테이션 함수가 반환하는 데이터의 타입.
 * @template TQueryData 쿼리 캐시에 있는 데이터의 타입.
 * @template TVariables 뮤테이션 함수에 전달되는 변수의 타입.
 */
interface OptimisticMutationOptions<TResult, TQueryData, TVariables = void> {
  /**
   * 비동기 뮤테이션을 수행하는 함수.
   * @param {TVariables} variables 뮤테이션 함수에 전달될 변수.
   * @returns {Promise<TResult>} 뮤테이션 결과를 담은 Promise.
   */
  mutationFn: (variables: TVariables) => Promise<TResult>;

  /**
   * 낙관적으로 업데이트될 데이터와 연결된 쿼리 키.
   * @type {QueryKey}
   */
  queryKey: QueryKey;

  /**
   * 캐시된 데이터를 낙관적으로 업데이트하는 함수.
   * @param {TQueryData} oldData 캐시 데이터의 이전 상태.
   * @param {TVariables} [variables] 뮤테이션에 사용된 변수.
   * @returns {TQueryData} 캐시 데이터의 새로운 상태.
   */
  updater: (oldData: TQueryData, variables?: TVariables) => TQueryData;

  /**
   * 뮤테이션 실패 시 낙관적 업데이트를 롤백하는 데 사용되는 선택적 함수.
   * @param {TQueryData} oldData 캐시 데이터의 이전 상태.
   * @param {TVariables} [variables] 뮤테이션에 사용된 변수.
   * @returns {TQueryData} 롤백할 캐시 데이터의 상태.
   */
  rollback?: (oldData: TQueryData, variables?: TVariables) => TQueryData;
}

/**
 * TanStack Query를 사용한 낙관적 업데이트를 위한 커스텀 훅.
 * 이 훅은 뮤테이션이 트리거된 직후 UI를 즉시 업데이트하고,
 * 뮤테이션 실패 시 자동으로 롤백을 처리하는 과정을 간소화.
 *
 * @template TResult 뮤테이션 함수가 반환하는 데이터의 타입.
 * @template TQueryData 쿼리 캐시에 있는 데이터의 타입.
 * @template TVariables 뮤테이션 함수에 전달되는 변수의 타입.
 *
 * @param {OptimisticMutationOptions<TResult, TQueryData, TVariables>} options 낙관적 뮤테이션을 위한 옵션.
 * @param {function(TVariables): Promise<TResult>} options.mutationFn 뮤테이션을 수행할 비동기 함수.
 * @param {QueryKey} options.queryKey 업데이트할 쿼리 키.
 * @param {function(TQueryData, TVariables): TQueryData} options.updater 캐시를 낙관적으로 업데이트하는 함수.
 * @param {function(TQueryData, TVariables): TQueryData} [options.rollback] 실패 시 롤백을 처리하는 선택적 함수.
 * **기본적으로 TanStack Query는 `onError`에서 `context.previousData`를 사용하여
 * 자동으로 롤백을 처리하지만, 커스텀 롤백 로직이 필요할 때 사용.**
 * @returns {UseMutationResult<TResult, unknown, TVariables, { previousData: TQueryData }>} `useMutation` 훅의 결과물 (예: `mutate`, `isLoading` 등).
 */
export const useOptimisticMutation = <TResult, TQueryData, TVariables = void>({
  mutationFn,
  queryKey,
  updater,
  rollback,
}: OptimisticMutationOptions<TResult, TQueryData, TVariables>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<TQueryData>(queryKey);
      queryClient.setQueryData(queryKey, (oldData: TQueryData) => updater(oldData, variables));
      return { previousData };
    },
    onError: (err, variables, context) => {
      console.error('Optimistic update failed:', err);
      if (context?.previousData) {
        queryClient.setQueryData(
          queryKey,
          rollback ? rollback(context.previousData, variables) : context.previousData,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
