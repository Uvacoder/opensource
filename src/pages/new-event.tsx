import { useForm, SubmitHandler } from "react-hook-form";
import Container from "../components/home/Container";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { useRouter } from "next/router";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { trpc } from "../utils/trpc";

type FormValues = {
  title: string;
  description: string;
  repoLink: string;
  technologies: Array<string>;
};

const people = [
  { id: 1, name: "React", unavailable: false },
  { id: 2, name: "Javascript", unavailable: false },
  { id: 3, name: "C#", unavailable: false },
  { id: 4, name: "Next.js", unavailable: false },
  { id: 5, name: "Prisma", unavailable: false },
  { id: 6, name: "Typescript", unavailable: false },
  { id: 7, name: "Asp.net", unavailable: false },
  { id: 8, name: "Vim", unavailable: false },
  { id: 9, name: "Lua", unavailable: false },
  { id: 10, name: "Go", unavailable: false },
];

export default function NewEvent() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [selectedPeople, setSelectedPeople] = useState([]);
  const router = useRouter();
  const { mutate } = trpc.project.create.useMutation();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    data.technologies = selectedPeople.map(
      (item: { id: number; name: string; unavailable: boolean }) => item.name
    );
    mutate(data);
  };

  return (
    <Container>
      <div className="mx-auto mt-5 flex w-full max-w-4xl flex-col gap-5 bg-gray-50">
        <button
          onClick={() => router.back()}
          className="flex h-[50px] w-[50px] items-center justify-center rounded-lg border bg-gray-50 hover:bg-gray-200"
        >
          <FaArrowLeft className="text-gray-700" />
        </button>
        <div className="flex-col">
          <form
            className="roun flex flex-col gap-5 rounded-lg border bg-white p-5 drop-shadow-sm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-4xl font-semibold tracking-tighter text-gray-700">
              Opensource Project
            </h1>
            <input
              placeholder="Title"
              className="w-full rounded-lg border p-5 text-sm"
              {...register("title")}
            />
            <input
              placeholder="Description"
              className="w-full rounded-lg border p-5 text-sm"
              {...register("description")}
            />
            <input
              placeholder="Github repo"
              className="w-full rounded-lg border p-5 text-sm"
              {...register("repoLink")}
            />
            <Listbox
              value={selectedPeople}
              onChange={setSelectedPeople}
              multiple
            >
              <Listbox.Button className="flex w-full space-x-2 rounded-lg border p-5 text-sm">
                {selectedPeople.length === 0 ? (
                  <p className="text-sm text-gray-400">Select technologies</p>
                ) : (
                  selectedPeople.map(
                    (person: { name: string; unavailable: boolean }, index) => {
                      return (
                        <div
                          key={index}
                          className="rounded border bg-gray-200 px-4"
                        >
                          <p>{person.name}</p>
                        </div>
                      );
                    }
                  )
                )}
              </Listbox.Button>
              <Listbox.Options className="rounded-lg border p-2">
                {people.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    value={person}
                    disabled={person.unavailable}
                    className=" rounded p-1 ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
                  >
                    <div className="flex items-center gap-2">
                      <FaCheck className="hidden ui-selected:block" />
                      {person.name}
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
            <button
              type="submit"
              className="rounded-md border border-black bg-black py-4 text-sm tracking-wide text-white hover:bg-white hover:text-black"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}