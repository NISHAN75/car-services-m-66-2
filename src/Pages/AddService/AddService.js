import React from "react";
import { useForm } from "react-hook-form";

const AddService = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const url = `https://arcane-springs-59725.herokuapp.com/service`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };
  return (
    <div className="w-50 mx-auto text-center">
      <h1 className="mt-5 mb-5">Please add Services</h1>
      <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="mb-3"
          placeholder="name"
          {...register("name", { required: true, maxLength: 20 })}
        />
        <textarea
          className="mb-3"
          placeholder="description"
          {...register("description")}
        />
        <input
          className="mb-3"
          placeholder="Price"
          type="number"
          {...register("price")}
        />
        <input
          className="mb-3"
          placeholder="photo URL"
          type="text"
          {...register("img")}
        />
        <input type="submit" value="Add User" />
      </form>
    </div>
  );
};

export default AddService;
