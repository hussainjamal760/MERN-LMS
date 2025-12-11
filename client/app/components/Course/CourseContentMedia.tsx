
import React, { useEffect, useState } from 'react';
import CoursePlayer from '../../../app/utils/CoursePlayer';
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useAddAnswerMutation, useAddQuestionMutation, useAddReviewMutation, useGetCourseDetailsQuery } from '../../../redux/features/courses/coursesApi';
import { format } from 'timeago.js';
import { BiMessage } from 'react-icons/bi';
import { VscVerifiedFilled } from 'react-icons/vsc';
import Ratings from '../../../app/utils/Ratings';

type Props = {
    data: any;
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo: number) => void;
    user: any;
    refetch: any;
}

const CourseContentMedia = ({ data, id, activeVideo, setActiveVideo, user, refetch }: Props) => {
    const [activeBar, setActiveBar] = useState(0);
    const [question, setQuestion] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);
    const [answer, setAnswer] = useState('');
    const [questionId, setQuestionId] = useState('');
    // const [isReviewReply, setIsReviewReply] = useState(false); // Unused

    const [addQuestion, { isSuccess, error, isLoading: questionCreationLoading }] = useAddQuestionMutation();
    const [addAnswer, { isSuccess: answerSuccess, error: answerError, isLoading: answerCreationLoading }] = useAddAnswerMutation();
    const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(id, { refetchOnMountOrArgChange: true });
    const [addReview, { isSuccess: reviewSuccess, error: reviewError, isLoading: reviewCreationLoading }] = useAddReviewMutation();

    const isReviewExists = courseData?.course?.reviews?.find(
        (item: any) => item.user._id === user._id
    );

    const handleQuestion = () => {
        if (question.length === 0) {
            toast.error("Question can't be empty");
        } else {
            addQuestion({ question, courseId: id, contentId: data[activeVideo]._id })
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setQuestion("");
            refetch();
            toast.success("Question added successfully");
        }
        if (answerSuccess) {
            setAnswer("");
            refetch();
            toast.success("Answer added successfully");
        }
        if (reviewSuccess) {
            setReview("");
            setRating(1);
            courseRefetch();
            toast.success("Review added successfully");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
        if (answerError) {
            if ("data" in answerError) {
                const errorMessage = answerError as any;
                toast.error(errorMessage.data.message);
            }
        }
        if (reviewError) {
            if ("data" in reviewError) {
                const errorMessage = reviewError as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error, answerSuccess, answerError, reviewSuccess, reviewError, refetch, courseRefetch]);

    const handleAnswerSubmit = () => {
        addAnswer({ answer, courseId: id, contentId: data[activeVideo]._id, questionId: questionId });
    };

    const handleReviewSubmit = () => {
        if (review.length === 0) {
            toast.error("Review can't be empty");
        } else {
            addReview({ review, rating, id });
        }
    };
    if (!data || data.length === 0) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <h1 className="text-2xl font-Poppins text-black dark:text-white">
                    No course content found.
                </h1>
            </div>
        );
    }

    return (
        <div className="w-[95%] 800px:w-[86%] py-6 m-auto">
            <CoursePlayer title={data[activeVideo]?.title} videoUrl={data[activeVideo]?.videoUrl} />

            <div className="w-full flex items-center justify-between my-5 gap-4">
                <button
                    className={`flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1 transition-all duration-300 ${activeVideo === 0 ? "opacity-50 cursor-not-allowed grayscale" : "cursor-pointer"}`}
                    onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}
                >
                    <AiOutlineArrowLeft className="mr-2" />
                    Prev Lesson
                </button>
                <button
                    className={`flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1 transition-all duration-300 ${data.length - 1 === activeVideo ? "opacity-50 cursor-not-allowed grayscale" : "cursor-pointer"}`}
                    onClick={() => setActiveVideo(data && data.length - 1 === activeVideo ? activeVideo : activeVideo + 1)}
                >
                    Next Lesson
                    <AiOutlineArrowRight className="ml-2" />
                </button>
            </div>

            <h1 className="pt-2 text-[25px] font-[700] text-black dark:text-white font-Poppins">
                {data[activeVideo].title}
            </h1>

            <br />

            <div className="w-full p-4 flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm mb-6">
                {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
                    <h5
                        key={index}
                        className={`800px:text-[20px] text-[16px] font-Poppins font-medium cursor-pointer transition-colors duration-200 ${activeBar === index ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500" : "text-black dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400"}`}
                        onClick={() => setActiveBar(index)}
                    >
                        {text}
                    </h5>
                ))}
            </div>

            <div className="min-h-[300px]">
                {activeBar === 0 && (
                    <p className="text-[17px] leading-8 whitespace-pre-line text-slate-700 dark:text-slate-300 font-Poppins animate-in fade-in duration-500">
                        {data[activeVideo]?.description}
                    </p>
                )}

                {activeBar === 1 && (
                    <div className="animate-in fade-in duration-500">
                        {data[activeVideo]?.links.map((item: any, index: number) => (
                            <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700" key={index}>
                                <h2 className="text-[18px] font-semibold text-black dark:text-white mb-1">
                                    {item.title ? item.title + " :" : "Resource Link :"}
                                </h2>
                                <a className="text-cyan-600 dark:text-cyan-400 hover:underline break-all" href={item.url} target='_blank'>
                                    {item.url}
                                </a>
                            </div>
                        ))}
                    </div>
                )}

                {activeBar === 2 && (
                    <div className="animate-in fade-in duration-500">
                        <div className="flex w-full gap-4">
                            <Image
                                src={user.avatar ? user.avatar.url : "/avatar.png"} // Fixed path assumption
                                width={50}
                                height={50}
                                alt="user"
                                className="w-[50px] h-[50px] rounded-full object-cover border-2 border-cyan-500 p-0.5 shrink-0"
                            />
                            <div className='w-full'>
                                <textarea
                                    name=""
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    id=""
                                    cols={40}
                                    rows={5}
                                    placeholder="Write your question here..."
                                    className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-black dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-Poppins text-[16px]"
                                ></textarea>
                                <div className="w-full flex justify-end mt-3">
                                    <button
                                        className={`px-8 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 ${questionCreationLoading && 'cursor-not-allowed opacity-70'}`}
                                        onClick={questionCreationLoading ? () => { } : handleQuestion}
                                    >
                                        Submit Question
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-700 my-8"></div>

                        <div>
                            <CommentReply
                                data={data}
                                activeVideo={activeVideo}
                                answer={answer}
                                setAnswer={setAnswer}
                                handleAnswerSubmit={handleAnswerSubmit}
                                user={user}
                                questionId={questionId}
                                setQuestionId={setQuestionId}
                                answerCreationLoading={answerCreationLoading}
                            />
                        </div>
                    </div>
                )}

                {/* Reviews */}
                {activeBar === 3 && (
                    <div className="w-full animate-in fade-in duration-500">
                        <>
                            {!isReviewExists && (
                                <div className="mb-8">
                                    <div className="flex w-full gap-4">
                                        <Image
                                            src={user.avatar ? user.avatar.url : "/avatar.png"} // Fixed path assumption
                                            width={50}
                                            height={50}
                                            alt="user"
                                            className="w-[50px] h-[50px] rounded-full object-cover border-2 border-cyan-500 p-0.5 shrink-0"
                                        />
                                        <div className="w-full">
                                            <h5 className="text-[18px] font-medium dark:text-white text-black mb-2">
                                                Give a Rating <span className="text-red-500">*</span>
                                            </h5>
                                            <div className="flex w-full mb-4">
                                                {[1, 2, 3, 4, 5].map((i) =>
                                                    rating >= i ? (
                                                        <AiFillStar
                                                            key={i}
                                                            className="mr-1 cursor-pointer text-yellow-500"
                                                            size={25}
                                                            onClick={() => setRating(i)}
                                                        />
                                                    ) : (
                                                        <AiOutlineStar
                                                            key={i}
                                                            className="mr-1 cursor-pointer text-yellow-500"
                                                            size={25}
                                                            onClick={() => setRating(i)}
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <textarea
                                                name=""
                                                value={review}
                                                onChange={(e) => setReview(e.target.value)}
                                                id=""
                                                cols={40}
                                                rows={5}
                                                placeholder="Write your review..."
                                                className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-black dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-Poppins text-[16px]"
                                            ></textarea>
                                            <div className="w-full flex justify-end mt-3">
                                                <button
                                                    className={`px-8 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 ${reviewCreationLoading && 'cursor-not-allowed opacity-70'}`}
                                                    onClick={reviewCreationLoading ? () => { } : handleReviewSubmit}
                                                >
                                                    Submit Review
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-700 my-6"></div>

                            <div className="w-full grid grid-cols-1 gap-6">
                                {(courseData?.course?.reviews && [...courseData.course.reviews].reverse())?.map((item: any, index: number) => (
                                    <div className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800" key={index}>
                                        <div className="w-full flex gap-4">
                                            <div className='shrink-0'>
                                                <Image
                                                    src={item.user.avatar ? item.user.avatar.url : "/avatar.png"} // Fixed path assumption
                                                    width={50}
                                                    height={50}
                                                    alt=""
                                                    className="w-[50px] h-[50px] rounded-full object-cover border border-slate-300 dark:border-slate-600"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <div className='flex items-center justify-between'>
                                                    <h1 className="text-[18px] font-semibold text-black dark:text-white font-Poppins">
                                                        {item.user.name}
                                                    </h1>
                                                    <small className="text-slate-500 dark:text-slate-400">
                                                        {format(item.createdAt)}
                                                    </small>
                                                </div>
                                                <div className='my-1'>
                                                    <Ratings rating={item.rating} />
                                                </div>
                                                <p className="text-slate-700 dark:text-slate-300 font-Poppins mt-2">
                                                    {item.comment}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    </div>
                )}
            </div>
        </div>
    )
}

const CommentReply = ({ data, activeVideo, answer, setAnswer, handleAnswerSubmit, user, questionId, setQuestionId, answerCreationLoading }: any) => {
    return (
        <div className="w-full my-3">
            {data[activeVideo].questions.map((item: any, index: any) => (
                <CommentItem
                    key={index}
                    data={data}
                    activeVideo={activeVideo}
                    item={item}
                    index={index}
                    answer={answer}
                    setAnswer={setAnswer}
                    questionId={questionId}
                    setQuestionId={setQuestionId}
                    handleAnswerSubmit={handleAnswerSubmit}
                    answerCreationLoading={answerCreationLoading}
                />
            ))}
        </div>
    )
}

const CommentItem = ({ questionId, setQuestionId, item, answer, setAnswer, handleAnswerSubmit, answerCreationLoading }: any) => {
    const [replyActive, setReplyActive] = useState(false);
    return (
        <div className="my-6 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
            <div className="flex mb-4 gap-4">
                <div className='shrink-0'>
                    <Image
                        src={item.user.avatar ? item.user.avatar.url : "/avatar.png"} // Fixed path assumption
                        width={50}
                        height={50}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full object-cover border border-slate-300 dark:border-slate-600"
                    />
                </div>
                <div className="w-full">
                    <div className='flex items-center justify-between mb-1'>
                        <h5 className="text-[18px] font-semibold text-black dark:text-white font-Poppins">
                            {item?.user.name}
                        </h5>
                        <small className="text-slate-500 dark:text-slate-400">
                            {format(item.createdAt)}
                        </small>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-Poppins">
                        {item?.question}
                    </p>
                </div>
            </div>

            <div className="w-full flex items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-3">
                <div 
                    className='flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors'
                    onClick={() => {
                        setReplyActive(!replyActive);
                        setQuestionId(item._id);
                    }}
                >
                    <BiMessage size={20} />
                    <span className="text-[14px] font-medium font-Poppins">
                        {!replyActive ? (item.questionReplies.length !== 0 ? "All Replies" : "Add Reply") : "Hide Replies"}
                    </span>
                    <span className="text-[12px] bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                        {item.questionReplies.length}
                    </span>
                </div>
            </div>

            {replyActive && (
                <div className='mt-4 animate-in fade-in slide-in-from-top-2 duration-300'>
                    {item.questionReplies.map((replyItem: any, index: number) => (
                        <div className="w-full flex gap-4 mb-5 ml-4 pl-4 border-l-2 border-slate-200 dark:border-slate-700" key={index}>
                            <div className='shrink-0'>
                                <Image
                                    src={replyItem.user.avatar ? replyItem.user.avatar.url : "/avatar.png"} // Fixed path assumption
                                    width={40}
                                    height={40}
                                    alt=""
                                    className="w-[40px] h-[40px] rounded-full object-cover"
                                />
                            </div>
                            <div className="w-full">
                                <div className="flex items-center gap-2 mb-1">
                                    <h5 className="text-[16px] font-semibold text-black dark:text-white font-Poppins">
                                        {replyItem.user.name}
                                    </h5>
                                    {replyItem.user.role === "admin" && (
                                        <VscVerifiedFilled className="text-cyan-500 text-[16px]" title="Admin/Instructor" />
                                    )}
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 text-[14px] font-Poppins">
                                    {replyItem.answer}
                                </p>
                                <small className="text-slate-400 text-[12px] block mt-1">
                                    {format(replyItem.createdAt)}
                                </small>
                            </div>
                        </div>
                    ))}
                    
                    <div className="w-full relative mt-4">
                        <input
                            type="text"
                            placeholder="Type your reply..."
                            value={answer}
                            onChange={(e: any) => setAnswer(e.target.value)}
                            className={`w-full pr-20 pl-4 py-3 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-black dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${answerCreationLoading && 'opacity-70 cursor-not-allowed'}`}
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1.5 px-4 py-1.5 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white text-[14px] font-semibold transition-colors disabled:bg-slate-400"
                            onClick={handleAnswerSubmit}
                            disabled={answer === "" || answerCreationLoading}
                        >
                            {answerCreationLoading ? "..." : "Send"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CourseContentMedia