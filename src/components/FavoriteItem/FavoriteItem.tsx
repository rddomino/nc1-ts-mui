import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { IItem, url } from '../../App';
import { Link } from 'react-router-dom';

import Like from '../../images/Like';

import styles from './FavoriteItem.module.scss';

interface IFavoriteItemProps {
    favoriteItem: IItem;
    onChangeLike: (event: React.MouseEvent) => void;
}

const fav__title = {
    width: '184px',
    margin: '20px 0 10px 0',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 400,
    fontSize: '16px',
    color: '#414141',
}

const fav__price = {
    fontFamily: 'Poppins',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '36px',
    color: '#414141',
}

const FavoriteItem: FC<IFavoriteItemProps> = ({ favoriteItem, onChangeLike }) => {

    return (
        <>
            {favoriteItem && (
                <Box className={styles.frow__inner}>
                    <Box className={styles.fimg__box}>
                        <img src={`${url}${favoriteItem.src}`} alt="food" className={styles.fimg} />
                    </Box>
                    <Box sx={{ marginLeft: "20px" }}>
                        <Typography component="h5" sx={fav__title}>
                            <Link to={`/${favoriteItem.id}`} className={styles.favlink}>{favoriteItem.name}</Link>
                        </Typography>
                        <Box className={styles.fav__footer}>
                            <Typography component="div" sx={fav__price}>{`$ ${favoriteItem.price}`}</Typography>
                            <Box
                                className={styles.ficon__wrapper}
                                id={favoriteItem.id.toString()}
                                onClick={(event: React.MouseEvent) => onChangeLike(event)}
                            >
                                <Like isLike={true} id={favoriteItem.id.toString()} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
}

export default FavoriteItem;