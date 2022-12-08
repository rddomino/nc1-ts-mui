import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { faker } from '@faker-js/faker';
import { IItem } from '../../App';

import styles from './FavoritesList.module.scss';
import FavoriteItem from '../FavoriteItem/FavoriteItem';

interface IFavoritesListProps {
    favorites: IItem[];
    onChangeLike: (event: React.MouseEvent) => void;
}

const typoStyles = {
    marginLeft: '30px',
    marginTop: '45px',
    fontSize: '24px',
    fontFamily: '"Anek Telugu", sans-serif',
    fontWeight: '600',
    textAlign: 'start',
}

const FavoritesList: FC<IFavoritesListProps> = ({ favorites, onChangeLike }) => {
    return (
        <Box className={styles.container}>
            <Typography variant="h6" component="div" sx={typoStyles}>
                FAVORITES
            </Typography>
            {favorites.map(item => <FavoriteItem favoriteItem={item} onChangeLike={onChangeLike} key={faker.datatype.uuid()} />)}
        </Box>
    )
}

export default FavoritesList;