import { Button } from "@/components/ui/button";
import React, { use } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
const CreateSessionButton = () => {
  const { register, handleSubmit, reset } = useForm();

  const createSessionApi = async (formdata) => {
    const res = await axios.post(
      "http://localhost:5000/api/v1/session/createSession",
      formdata,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return res;
  };

  const queryclient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createSessionApi,
    onSuccess: (data) => {
      // console.log(data)
      toast.success("Session Created");

      reset();
      queryclient.invalidateQueries({ queryKey: ["session"] });
    },
    onError: (error) => {
      alert(error);
    },
  });

  const SessionFormHandler = (formdata) => {
    // console.log(formdata)
    mutation.mutate(formdata);
  };
  return (
    <Dialog>
      <DialogTrigger className="fixed top-120 right-5 p-3 px-6 font-bold text-white bg-zinc-900 rounded-4xl text-[19px] cursor-pointer">
        <h1>Create Session</h1>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter the details for your session</DialogTitle>
          <form onSubmit={handleSubmit(SessionFormHandler)} action="">
            <input
              type="text"
              {...register("role")}
              placeholder="Enter your role"
              className="outline-0 border-b border-black w-[35vw] my-[2vw]"
            />
            <input
              type="number"
              {...register("experience")}
              placeholder="Enter your experience"
              className="outline-0 border-b border-black w-[35vw] my-[2vw]"
            />
            <input
              type="text"
              {...register("topicsToFocus")}
              placeholder="Enter topics to focus"
              className="outline-0 border-b border-black w-[35vw] my-[2vw]"
            />
            <DialogClose asChild>
              <button
                type="submit"
                className="px-3 py-2 bg-zinc-900 text-white rounded-2xl ml-[25vw] mb-5"
              >
                Create Session
              </button>
            </DialogClose>
          </form>

          <DialogDescription>
            Please provide form details carefully
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSessionButton;
