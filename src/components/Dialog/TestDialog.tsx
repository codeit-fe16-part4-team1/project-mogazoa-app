'use client';

import { Button } from '@/components/Button/Button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog/core/DialogComponents';
import useDialog from '@/hooks/useDialog';

const TestDialog = () => {
  const { open } = useDialog();

  return (
    <DialogContent>
      {/* Header */}
      <DialogHeader>
        <DialogTitle>테스트 다이얼로그</DialogTitle>
        <DialogDescription>테스트 다이얼로그 입니다.</DialogDescription>
      </DialogHeader>

      {/* Body */}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu lacus vulputate ante
        egestas pretium. Phasellus hendrerit ac massa ac varius. Nulla quis porttitor diam, vel
        interdum felis. Pellentesque condimentum sit amet mauris non mattis. Proin pretium ut enim
        id aliquam. Aliquam erat volutpat. Cras lorem nulla, finibus eu rutrum ac, lacinia et urna.
        Pellentesque pulvinar tempor magna et malesuada. Nulla gravida aliquam metus sit amet
        commodo. Fusce sagittis ut lorem ut congue. In volutpat risus arcu, in varius libero
        sagittis et.
      </p>

      <p>
        Maecenas et felis gravida lacus volutpat dignissim ut auctor orci. Ut condimentum malesuada
        iaculis. Sed quis interdum neque, non ullamcorper lectus. Donec placerat, odio in gravida
        congue, libero leo blandit risus, ac tristique nisl diam eu purus. Aenean at lacus non nulla
        volutpat ultrices. Sed ultricies pretium pellentesque. Vestibulum ut accumsan massa.
      </p>

      <p>
        Mauris congue metus et finibus commodo. Duis luctus egestas lectus, at semper nulla sodales
        at. Duis ornare eros nisi. Integer vitae sodales leo. Suspendisse ut libero placerat, luctus
        arcu ut, placerat orci. Donec ultrices aliquam elit, ac egestas orci iaculis at. Ut maximus,
        magna at malesuada molestie, nibh dolor condimentum dui, in aliquam nisi nulla nec neque.
        Donec at justo varius, dapibus neque sed, elementum sapien. Sed eget diam hendrerit,
        tristique est ut, blandit libero. Pellentesque felis diam, viverra vel blandit non, euismod
        id risus. Cras congue faucibus enim, sed finibus elit placerat sed. Fusce in ligula eget
        nunc molestie cursus. Praesent ante arcu, blandit nec lacinia et, aliquet quis mauris.
      </p>

      {/* Footer */}
      <DialogFooter className='flex-between w-full'>
        <Button
          className='w-full'
          size='S'
          onClick={() =>
            open({
              dialogName: 'test-inner-dialog',
              dialogProps: { id: 1 },
              isBlockBackgroundClose: true,
            })
          }
        >
          내부 다이얼로그 열기
        </Button>
        <DialogClose asChild className='w-full'>
          <Button size='S'>닫기</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default TestDialog;
