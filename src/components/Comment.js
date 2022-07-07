import {formatRelativeTime} from '../utils/helpers';
import React, {useState} from 'react';
import Avatar from './Avatar';
import Like from './Like';
import Reply from './Reply';
import More from './More';
import EditForm from './EditForm';
import Replies from './Replies';
import ReplyForm from './ReplyForm';

const Comment = (props) => {
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [isInReplyMode, setIsInReplyMode] = useState(false);

    const toggleEditMode = () => {
        setIsInEditMode(current => !current);
    };

    const toggleReplyMode = () => {
        setIsInReplyMode(current => !current);
    };

    const comment = props.comment;
    const hasReplies = comment.replies && comment.replies.length > 0;
    const isNotPublished = comment.status !== 'published';
    const html = {__html: comment.html};

    if (isNotPublished) {
        html.__html = '<i>This comment has been removed.</i>';
    }

    if (isInEditMode) {
        return (
            <EditForm comment={comment} toggle={toggleEditMode} parent={props.parent} />
        );
    } else {
        return (
            <>
                <div className={`flex flex-col ${hasReplies ? 'mb-4' : 'mb-12'}`}>
                    <div>
                        <div className="flex justify-start items-center">
                            <Avatar comment={comment} saturation={props.avatarSaturation} />
                            <div className="ml-3">
                                <h4 className="text-lg font-sans font-semibold mb-1 tracking-tight dark:text-neutral-300">{comment.member.name}</h4>
                            </div>
                        </div>
                        <div className={`ml-14 mb-4 pr-4 font-sans leading-normal ${isNotPublished ? 'text-neutral-400' : 'text-neutral-900'} dark:text-neutral-300`}>
                            <p dangerouslySetInnerHTML={html} className="whitespace-pre-wrap text-[16.5px] leading-normal"></p>
                        </div>
                        <div className="ml-14 flex gap-5 items-center">
                            <Like comment={comment} />
                            {isNotPublished || !props.parent && <Reply comment={comment} toggleReply={toggleReplyMode} isReplying={isInReplyMode} />}
                            <h6 className="text-sm text-neutral-400 font-sans">{formatRelativeTime(comment.created_at)}</h6>
                            <More comment={comment} toggleEdit={toggleEditMode} />
                        </div>
                    </div>    
                </div>
                {isInReplyMode &&
                    <div className={`ml-14 mb-10 ${!hasReplies && 'mt-10'}`}>
                        <ReplyForm parent={comment} toggle={toggleReplyMode} avatarSaturation={props.avatarSaturation} />
                    </div>
                }
                {hasReplies && 
                    <div className="ml-14 mt-10">
                        <Replies comment={comment} avatarSaturation={props.avatarSaturation} />
                    </div>
                }
            </>
        );
    }
};

export default Comment;
