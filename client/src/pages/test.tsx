import React, { useState } from 'react';
import { Star, StarHalf } from 'lucide-react';
import reviewData from './pi.json';
import './test.css';

interface Review {
    ID: number;
    Review: string;
    Rating: number;
}

interface StarRatingProps {
    rating: number;
}

interface CarReviewCardProps {
    review: string;
    rating: number;
    id: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => {
                if (index < fullStars) {
                    return <Star key={index} color="#FFD700" fill="#FFD700" className="w-5 h-5" />;
                }
                if (index === fullStars && hasHalfStar) {
                    return <StarHalf key={index} color="#FFD700" fill="#FFD700" className="w-5 h-5" />;
                }
                return <Star key={index} color="#E0E0E0" className="w-5 h-5" />;
            })}
            <span>({rating}/10)</span>
        </div>
    );
};

const CarReviewCard: React.FC<CarReviewCardProps> = ({ review, rating, id }) => {
    return (
        <div className="review-card">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Review #{id}</h3>
                <StarRating rating={rating * 0.5} />
            </div>
            <p className="text-gray-700">{review.trim()}</p>
        </div>
    );
};

const CarReviewsApp: React.FC = () => {
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const filteredReviews: Review[] = selectedRating !== null
        ? reviewData.filter(review => 
            review.Rating >= (selectedRating * 2) && 
            review.Rating < ((selectedRating + 1) * 2)
        )
        : reviewData;

    return (
        <div className="container">
            <h1>Toyota Reviews</h1>
            
            <div className="rating-filter">
                {[0, 1, 2, 3, 4].map(rating => (
                    <button
                        key={rating}
                        onClick={() => setSelectedRating(rating)}
                        className={`rating-button ${selectedRating === rating ? 'active' : ''}`}
                    >
                        {rating + 1} Star{rating !== 4 ? 's' : ''}
                    </button>
                ))}
                <button
                    onClick={() => setSelectedRating(null)}
                    className={`rating-button ${selectedRating === null ? 'active' : ''}`}
                >
                    All Reviews
                </button>
            </div>

            <div className="max-w-2xl mx-auto">
                {filteredReviews.length > 0 ? (
                    filteredReviews.map(review => (
                        <CarReviewCard 
                            key={review.ID} 
                            id={review.ID}
                            review={review.Review} 
                            rating={review.Rating} 
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No reviews found for the selected rating.</p>
                )}
            </div>
        </div>
    );
};

export default CarReviewsApp;