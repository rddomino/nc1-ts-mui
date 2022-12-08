import React, { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { IItem, url } from '../../App';
import ReactImageMagnify from 'react-image-magnify';
import { useParams } from 'react-router-dom';

import Like from '../../images/Like';
import ResizeIcon from '../../images/ResizeIcon';
import Header from '../../components/Header/Header';

import styles from './ItemPage.module.scss';


interface IFavoriteItemProps {
    isLike: boolean;
    onChangeLike: (event: React.MouseEvent) => void;
    items: IItem[];
}

const ip__title = {
    width: '601px',
    margin: '20px 0 10px 0',
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 400,
    fontSize: '64px',
    lineHeight: '96px',
    color: '#414141',
}

const ip__price = {
    fontFamily: 'Poppins',
    fontWeight: 500,
    fontSize: '64px',
    color: '#414141',
}

const ItemPage: FC<IFavoriteItemProps> = ({ isLike, onChangeLike, items }) => {

    const { id } = useParams();
    const [selectedItem, setSelectedItem] = useState<IItem>();

    useEffect(() => {
        if (!items) {
            try {
                const fetchData = async () => {
                    const res = await fetch(`${url}/image/?id=${id}`);
                    const json = await res.json();
                    setSelectedItem(json);
                }
                fetchData();
            } catch (err) {
                console.log(err);
            }
        } else {
            setSelectedItem(items.find((item: IItem) => (item.id === Number(id))));
        }
    }, [id, items]);

    return (
        <>
            <Header title="PRODUCT PAGE" />
            {selectedItem && (
                <Box sx={{ height: "100%", width: "100%", backgroundColor: "#FBFBFB", display: "flex", justifyContent: "flex-end" }}>
                    <Box className={styles.iprow__inner}>
                        <Box sx={{ display: "flex" }}>
                            <ReactImageMagnify {...{
                                smallImage: {
                                    alt: "food",
                                    isFluidWidth: true,
                                    src: `${url}${selectedItem.src}`
                                },
                                largeImage: {
                                    src: `${url}${selectedItem.src}`,
                                    width: 1000,
                                    height: 1000
                                }
                            }} />
                            <Box sx={{ marginLeft: "130px" }}>
                                <Typography component="h5" sx={ip__title}>{selectedItem.name}</Typography>
                                <Box className={styles.ip__footer}>
                                    <Typography component="div" sx={ip__price}>{`$ ${selectedItem.price}`}</Typography>
                                    <Box
                                        className={styles.ipicon__wrapper}
                                        id={selectedItem.id.toString()}
                                        onClick={(event: React.MouseEvent) => onChangeLike(event)}
                                    >
                                        <Like isLike={selectedItem.favorite} id={selectedItem.id.toString()} bigLike={true} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex" }} >
                            <Box sx={{ margin: "20px 0 0 224px" }}>
                                <ResizeIcon />
                            </Box>
                        </Box>
                    </Box >
                </Box >
            )}
        </>
    );
};

export default ItemPage;