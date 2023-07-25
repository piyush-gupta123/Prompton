"use client";
import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
// import { Router } from 'next/router';

const CreatePrompt = () => {
  const router = useRouter();
//   const { data: session } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id')
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(()=>{
    const getPromptDetails = async()=>{
        const fetchPrompt = await fetch(`/api/prompt/${promptId}`)
        const data = await fetchPrompt.json();

        setPost({
            prompt: data.prompt,
            tag: data.tag
        })
    }

    if(promptId) getPromptDetails()
  },[promptId])
  

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) alert('Prompt Id not found')

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }

    } catch (err) {
      return console.log(err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default CreatePrompt;
