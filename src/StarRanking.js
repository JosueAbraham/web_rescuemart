import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const StarRanking = (props) => {
    const [ranking, setRanking] = useState(props.ranking);
    const [estrellas, setEstrellas] = useState(props.style);

    useEffect(() => {
        if (props.card === false) {
            if (ranking <= 2) {
                setEstrellas({ color: "red" });
            } else {
                setEstrellas({ color: "green" });
            }
        }
    }, [ranking]);

    const indexStart = (index) => {
        setRanking(index + 1);
    };

    return (
        <div className='star-container'>
            {[...new Array(5)].map((star, index) => (
                index < ranking ?
                    <FontAwesomeIcon icon={solidStar} key={index} style={estrellas} onClick={() => indexStart(index)} />
                    :
                    <FontAwesomeIcon icon={regularStar} key={index} style={estrellas} onClick={() => indexStart(index)} />
            ))}
        </div>
    );
};

export default StarRanking;
