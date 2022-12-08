import React, { FC } from 'react';
import styles from './Like.module.scss';

interface ILike {
    isLike: boolean;
    id: string;
    bigLike?: boolean;
}

const Like: FC<ILike> = ({ isLike = false, id, bigLike = false }) => {

    const likeClass = isLike ? styles.isLikeActive : "";
    const bigLikeClass = bigLike ? styles.bigLike : "";
    const classes = `${likeClass} ${bigLikeClass}`;

    return (
        <span className={classes} id={id}>
            <svg width="31.5" height="31.5" viewBox="0 0 31.5 31.5" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.8,10.7c0,0,1.6-2.4,3.6-2.8c5.1-0.9,7.2,3.6,6.4,6.9c-1.5,5.9-10,11.1-10,11.1s-8.5-5.2-10-11.1 C4.9,11.5,7,7,12.1,7.9C14.2,8.3,15.8,10.7,15.8,10.7z" fill="#ffffff" />
            </svg>
        </span >
    );
};

export default Like;