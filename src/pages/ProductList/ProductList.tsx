import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { faker } from '@faker-js/faker';
import { useGlobalState } from '../../App';
import { IItem, url } from '../../App';
import { Link } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Like from '../../images/Like';

import styles from './ProductList.module.scss';

interface IProductListProps {
    onChangeLike: (event: React.MouseEvent) => void;
}

const row__title = {
    display: 'flex',
    alignItems: 'flex-end',
    padding: '10px 25px 0 25px',
    width: '100%',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '30px',
    color: '#414141',
}

const row__price = {
    fontFamily: 'Poppins',
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '36px',
    color: '#414141',
}

const ProductList: FC<IProductListProps> = ({ onChangeLike }) => {
    const [items] = useGlobalState('data');

    const Row = ({ data, index }: { data: IItem[], index: number }) => {
        const dataItem = data[index];
        return (
            <>
                {data && (
                    <Box className={styles.row__wrapper}>
                        <Box className={styles.row__inner}>
                            <Box className={styles.img__box}>
                                <img src={`${url}${dataItem.src}`} alt="food" className={styles.img} />
                            </Box>
                            <Typography component="h5" sx={row__title}>
                                <Link to={`/${dataItem.id}`} className={styles.link}>{dataItem.name}</Link>
                            </Typography>
                            <Box className={styles.row__footer}>
                                <Typography component="div" sx={row__price}>{`$ ${dataItem.price}`}</Typography>
                                <Box
                                    className={styles.icon__wrapper}
                                    id={dataItem.id.toString()}
                                    onClick={(event: React.MouseEvent) => onChangeLike(event)}
                                >
                                    <Like isLike={dataItem.favorite} id={dataItem.id.toString()} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )}
            </>
        )
    };

    return (
        <>
            <Header title="PRODUCT LIST PAGE" />
            <Box sx={{ height: "100%", width: "100%", position: "relative", backgroundColor: "#FBFBFB" }}>
                {
                    items && (
                        <AutoSizer>
                            {({ height, width }) => (
                                <FixedSizeList
                                    className={styles.row}
                                    height={height}
                                    itemCount={items.length}
                                    itemSize={items.length}
                                    layout="horizontal"
                                    width={width}
                                    itemKey={faker.datatype.uuid}
                                    itemData={items}
                                >
                                    {Row}
                                </FixedSizeList>
                            )}
                        </AutoSizer>
                    )
                }
            </Box>
        </>
    );
}

export default ProductList;