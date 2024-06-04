"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import React from "react";
import { useState } from "react";

interface PrincipleCardProps {
  text: string;
}

const PrincipleCard: React.FC<PrincipleCardProps> = ({ text }) => {
  const [editable, setEditable] = useState(false);
  const [PrincipleText, setPrincipleText] = useState(text);

  const handleSave = () => {
    setEditable(false);
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleDelete = () => {};

  return (
    <Card className="p-4 flex justify-between items-center">
      {editable ? (
        <Textarea
          className="w-full p-2 font-medium border-none bg-muted/50"
          value={PrincipleText}
          onChange={(e) => setPrincipleText(e.target.value)}
        />
      ) : (
        <p className="font-medium">{PrincipleText}</p>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="ml-2"
        onClick={editable ? handleSave : handleEdit}
      >
        {editable ? (
          <CheckIcon className="w-4 h-4" />
        ) : (
          <PencilIcon className="w-4 h-4" />
        )}
      </Button>
      {editable && (
        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={handleDelete}
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Your about to delete this principle. This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </Card>
  );
};

const NewPrincipleCard: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [principle, setPrinciple] = React.useState("");

  const handleSave = () => {
    // Add logic to save the principle
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="w-full">
          <PlusIcon className="w-4 h-4 mr-2" />
          Create New Principle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Principle</DialogTitle>
          <DialogDescription>Enter your new principle below.</DialogDescription>
        </DialogHeader>
        <Input
          id="principle"
          value={principle}
          placeholder="Enter your new principle here..."
          onChange={(e) => setPrinciple(e.target.value)}
          className="col-span-3"
        />

        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save Principle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default async function PrinciplesPage() {
  const defaultPrinciples = [
    "Pain + Reflection = Progress",
    "Truth - more than anything else - is what I want to hold on to and protect.",
    "Radical Open-Mindedness and Radical Transparency are essential for rapid learning and effective change.",
    "Make decisions like an owner, and own the outcomes.",
    "Create a culture in which it is okay to make mistakes and unacceptable not to learn from them.",
  ];

  return (
    <div className="flex-1 w-full flex flex-col gap-4 items-center justify-center">
      <h1 className="font-logo font-black text-5xl">Your Principles</h1>
      <p className="text-xl mb-16">A list of all your principles.</p>
      <div className="flex flex-col gap-4">
        <NewPrincipleCard />

        {defaultPrinciples.map((principle, index) => (
          <PrincipleCard key={index} text={principle} editable={false} />
        ))}
      </div>
    </div>
  );
}
