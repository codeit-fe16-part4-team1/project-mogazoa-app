import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';

interface OptimisticMutationOptions<TResult, TQueryData, TVariables = void> {
  mutationFn: (variables: TVariables) => Promise<TResult>;
  queryKey: QueryKey;
  updater: (oldData: TQueryData, variables?: TVariables) => TQueryData;
  rollback?: (oldData: TQueryData, variables?: TVariables) => TQueryData;
}

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
