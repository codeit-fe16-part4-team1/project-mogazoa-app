'use client';

import { Button } from '@/components/Button/Button';

import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from '@/components/Dialog/core/DialogComponents';
// import { useRouter } from 'next/router';
// import { useState } from 'react';

const CompareDialog = () => {
  // const router = useRouter;
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState(null);

  // const openDialog = (product) => {
  //   setSelectedProduct(product);
  //   setIsDialogOpen(true);
  // };

  // const closeDialog = () => {
  //   setIsDialogOpen(false);
  //   setSelectedProduct(null);
  // };

  // const handleCompareClick = () => {
  //   closeDialog();
  //   router.push('/compare');
  // };
  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div>
          <Button></Button>
          <Button></Button>
        </div>
        <DialogFooter>
          <Button></Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};
export default CompareDialog;
