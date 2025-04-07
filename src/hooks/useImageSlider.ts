import { useEffect, useState } from "react";

interface UseImageSliderProps {
    length: number;
    autoPlay?: boolean;
    autoPlayInterval?: number;
}

const useImageSlider = ({
    length,
    autoPlay = true,
    autoPlayInterval = 5000,
}: UseImageSliderProps) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === length - 1 ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? length - 1 : prev - 1));
    };

    const goToSlide = (index: number) => {
        if (index >= 0 && index < length) {
            setCurrentSlide(index);
        }
    };

    useEffect(() => {
        if (autoPlay) {
            const intervalId = setInterval(handleNext, autoPlayInterval);
            return () => clearInterval(intervalId);
        }
    }, [autoPlay, autoPlayInterval, length]);

    return { currentSlide, handleNext, handlePrev, goToSlide };
};

export default useImageSlider;
