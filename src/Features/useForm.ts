"use client";

import { useEffect, useState } from "react";
import apis from "./request";
import utils from "./utils";
import confetti from "canvas-confetti";
let interval: NodeJS.Timeout;
const useForm = (formId: string) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoading, setLoading] = useState(false);
  const [form, setForm] = useState<Form>();
  const [responses, setResponses] = useState<ResponseItem[]>([]);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [currentWinner, setCurrentWinner] = useState<User | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = event.target.files[0];
    if (file) {
      setActiveIndex(-1);
      setIsDrawing(false);
      setCurrentWinner(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        const loadedNames = (e.target.result as string)
          .split("\n")
          .map((name) => name.trim())
          .filter((name) => name !== "")
          .map((name) => ({ fullName: name }));
        setAvailableUsers(loadedNames as User[]);
      };
      reader.readAsText(file);
    }
    setLoading(false);
  };
  useEffect(() => {
    syncForm();
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const syncForm = async () => {
    try {
      setLoading(true);
      const formData = await apis.getForm<Form>(formId);
      setForm(formData);
      if (formData) {
        const responses = await apis.getResponses<Response>(formId);
        setResponses(responses.items);
        const parsedUsers = utils.getParsedResponses(
          formData.fields,
          responses.items
        );
        setAvailableUsers(parsedUsers);
        setCurrentWinner(null);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const [isDrawing, setIsDrawing] = useState(false);
  const animateNames = () => {
    if (availableUsers.length === 0) return;

    setIsDrawing(true);
    let count = 0;
    const duration = 3 * 1000;
    const intervalTime = 100;

    const interval = setInterval(() => {
      setActiveIndex(count % availableUsers.length);
      count++;
      if (count * intervalTime >= duration) {
        clearInterval(interval);
        setIsDrawing(false);

        const winnerIndex = Math.floor(Math.random() * availableUsers.length);
        const winner = availableUsers[winnerIndex];

        setCurrentWinner(winner);
        setAvailableUsers((prev) =>
          prev.filter((_, index) => index !== winnerIndex)
        );

        setActiveIndex(winnerIndex);
        launchConfetti();
      }
    }, intervalTime);
  };
  const startDraw = () => {
    setIsDrawing(true);
    interval = setInterval(() => {
      setActiveIndex((e) => (e === availableUsers.length - 1 ? 0 : e + 1));
    }, 120);
  };
  const endDraw = () => {
    clearInterval(interval);
    setIsDrawing(false);
  };

  return {
    syncForm,
    form,
    responses,
    users: availableUsers,
    isLoading,
    isDrawing,
    startDraw,
    endDraw,
    activeIndex,
    selected: !isDrawing && activeIndex > -1,
    animateNames,
    handleFileChange,
    currentWinner,
    remainingCount: availableUsers.length,
  };
};

export default useForm;

export type Form = {
  id: string;
  fields: [];
  title: string;
  theme: {
    href: string;
    background: {
      href: string;
    };
  };
  welcome_screens: {
    attachment: {
      href: string;
    };
  }[];
};
export type Field = {
  id: string;
  type: "multiple_choice" | "short_text" | "contact_info";
  subfield_key?: "first_name" | "last_name" | "phone_number" | "email";
  properties: {
    fields: Field[];
  };
};

export type Response = {
  items: ResponseItem[];
};
export type ResponseItem = {
  answers: {
    field: Field;
    type: string;
    text?: string;
    phone_number?: string;
    email?: string;
  }[];
};

export type User = {
  phoneNumber?: string;
  email?: string;
  firstName: string;
  lastName: string;
  fullName: string;
};

const launchConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
