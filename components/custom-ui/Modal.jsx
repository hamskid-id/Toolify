"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import React, { memo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export const ModalWrapper = memo(
  ({
    children,
    bigscreenwidth,
    title,
    trigger,
    description,
    scrollable = false,
    bg,
    open,
    setOpen,
  }) => {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          className={cn(
            "bg-white m-auto ",
            bigscreenwidth && bigscreenwidth,
            scrollable && "overflow-y-scroll max-h-screen",
            bg && bg
          )}
        >
          <DialogHeader className={cn("hidden", title && "block")}>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter className="sm:justify-start hidden">
            <DialogClose asChild>
              <Button></Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

ModalWrapper.displayName = "ModalWrapper";
