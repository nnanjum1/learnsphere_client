"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { authClient } from "@/app/lib/auth-client";

import {
    Course,
    CourseFormData,
} from "@/app/types/course";

import {
    createCourse,
    updateCourse,
} from "@/app/services/course.service";

import { categories } from "@/app/constants/categories";


interface CourseFormProps {
    mode: "add" | "edit";
    course?: Course;
}


const CourseForm = ({
    mode,
    course,
}: CourseFormProps) => {


    const router = useRouter();


    const {
        data: session,
        isPending,
    } = authClient.useSession();



    const role = (
        session?.user as {
            role?: string
        }
    )?.role;



    useEffect(() => {

        if (isPending) return;


        if (!session?.user) {
            router.replace("/login");
            return;
        }


        if (role !== "instructor") {
            router.replace("/");
        }


    }, [
        session,
        role,
        isPending,
        router
    ]);




    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isValid,
        },
    } = useForm<CourseFormData>({
        mode: "onChange",

        defaultValues: course
            ? {
                title: course.title,
                thumbnail: course.thumbnail,
                category: course.category,
                level: course.level,
                duration: course.duration,
                price: Number(course.price),

                shortDescription:
                    course.shortDescription,

                description:
                    course.description,

                requirements:
                    course.requirements?.join("\n") || "",

                learningOutcomes:
                    course.learningOutcomes?.join("\n") || "",
            }
            : {
                title: "",
                thumbnail: "",
                category: "",
                level: "Beginner",
                duration: "",
                price: 0,
                shortDescription: "",
                description: "",
                requirements: "",
                learningOutcomes: "",
            },
    });





    const onSubmit = async (
        data: CourseFormData
    ) => {


        if (!session?.user) {

            toast.error(
                "Please login first"
            );

            return;

        }



        const user = session.user;



        const courseData: Course = {


            title: data.title,


            thumbnail: data.thumbnail,


            category: data.category,


            level: data.level,


            duration: data.duration,


            price: Number(data.price),



            shortDescription:
                data.shortDescription,



            description:
                data.description,



            requirements:
                data.requirements
                    .split("\n")
                    .map(item => item.trim())
                    .filter(Boolean),



            learningOutcomes:
                data.learningOutcomes
                    .split("\n")
                    .map(item => item.trim())
                    .filter(Boolean),



            instructorId: user.id,


            instructorName: user.name,


            instructorEmail: user.email,


            enrollmentCount:
                course?.enrollmentCount || 0,


            createdAt:
                course?.createdAt ||
                new Date().toISOString(),


            updatedAt:
                new Date().toISOString(),

        };



        let result;



        if (mode === "add") {


            result =
                await createCourse(
                    courseData
                );


        }
        else {


            if (!course?._id) {

                toast.error(
                    "Course ID missing"
                );

                return;

            }


            result =
                await updateCourse(
                    course._id,
                    courseData
                );

        }




        if (result.success) {


            toast.success(
                result.message
            );


            reset();


            router.push(
                "/dashboard/manage-courses"
            );


        }
        else {


            toast.error(
                result.message
            );

        }


    };





    return (

        <div className="
            mx-auto
            max-w-4xl
            rounded-2xl
            bg-white
            p-8
            shadow
        ">


            <h2 className="
                mb-8
                text-3xl
                font-bold
            ">

                {
                    mode === "add"
                        ? "Add New Course"
                        : "Edit Course"
                }

            </h2>



            <form
                onSubmit={
                    handleSubmit(onSubmit)
                }
                className="space-y-6"
            >



                <InputField
                    label="Course Title"
                    error={errors.title?.message}
                    register={
                        register(
                            "title",
                            {
                                required:
                                    "Course title is required"
                            }
                        )
                    }
                />



                <InputField
                    label="Thumbnail URL"
                    error={errors.thumbnail?.message}
                    register={
                        register(
                            "thumbnail",
                            {
                                required:
                                    "Thumbnail URL is required"
                            }
                        )
                    }
                />





                <div>

                    <select

                        {...register(
                            "category",
                            {
                                required:
                                    "Category is required"
                            }
                        )}

                        className="
                        w-full
                        rounded-xl
                        border
                        p-3
                        "
                    >

                        <option value="">
                            Select Category
                        </option>


                        {
                            categories.map(
                                item => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                )
                            )
                        }

                    </select>


                    <Error text={
                        errors.category?.message
                    } />

                </div>





                <div>

                    <select

                        {...register(
                            "level",
                            {
                                required:
                                    "Level is required"
                            }
                        )}

                        className="
                    w-full
                    rounded-xl
                    border
                    p-3
                    "
                    >

                        <option value="">
                            Select Level
                        </option>

                        <option value="Beginner">
                            Beginner
                        </option>

                        <option value="Intermediate">
                            Intermediate
                        </option>

                        <option value="Advanced">
                            Advanced
                        </option>


                    </select>


                    <Error text={
                        errors.level?.message
                    } />


                </div>






                <InputField
                    label="Duration"
                    error={errors.duration?.message}
                    register={
                        register(
                            "duration",
                            {
                                required:
                                    "Duration is required"
                            }
                        )
                    }
                />





                <div>

                    <input
                        type="number"
                        {...register("price", {
                            valueAsNumber: true,
                            required: "Price is required",
                            min: {
                                value: 0,
                                message: "Price cannot be negative",
                            },
                        })}
                    />


                    <Error text={
                        errors.price?.message
                    } />


                </div>






                <TextArea
                    name="shortDescription"
                    placeholder="Short Description"
                    register={register(
                        "shortDescription",
                        {
                            required:
                                "Short description required"
                        }
                    )}
                    error={
                        errors.shortDescription?.message
                    }
                />





                <TextArea
                    name="description"
                    placeholder="Full Description"
                    register={register(
                        "description",
                        {
                            required:
                                "Description required",

                            minLength: {
                                value: 20,
                                message:
                                    "Minimum 20 characters"
                            }
                        }
                    )}
                    error={
                        errors.description?.message
                    }
                />






                <TextArea
                    name="requirements"
                    placeholder="One requirement per line"
                    register={register(
                        "requirements",
                        {
                            required:
                                "Requirements required"
                        }
                    )}
                    error={
                        errors.requirements?.message
                    }
                />






                <TextArea
                    name="learningOutcomes"
                    placeholder="One learning outcome per line"
                    register={register(
                        "learningOutcomes",
                        {
                            required:
                                "Learning outcomes required"
                        }
                    )}
                    error={
                        errors.learningOutcomes?.message
                    }
                />





                <button
                    type="submit"
                    className="
                    rounded-xl
                    bg-indigo-600
                    px-8
                    py-3
                    font-semibold
                    text-white
                    hover:bg-indigo-700
                    "
                >

                    {
                        mode === "add"
                            ? "Add Course"
                            : "Update Course"
                    }


                </button>


            </form>


        </div>

    );

};




const Error = ({
    text
}: {
    text?: string
}) => (
    <p className="
        mt-1
        text-sm
        text-red-500
    ">
        {text}
    </p>
);





const InputField = ({
    label,
    register,
    error
}: any) => (

    <div>

        <input

            {...register}

            placeholder={label}

            className="
        w-full
        rounded-xl
        border
        p-3
        "

        />

        <Error text={error} />

    </div>

);





const TextArea = ({
    placeholder,
    register,
    error
}: any) => (

    <div>

        <textarea

            {...register}

            placeholder={placeholder}

            className="
        h-32
        w-full
        rounded-xl
        border
        p-3
        "

        />


        <Error text={error} />


    </div>

);



export default CourseForm;