import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './bubble.scss';

const Bubble = () => {
    const [array, setArray] = useState([1, 2, 3]); // captures input array

    const [inputValue, setInputValue] = useState(''); // text input of data on change handle
    const [isValid, setIsValid] = useState(true); // validation of input
    const [currentStep, setCurrentStep] = useState(0); // current step of the sorting algorithm
    const sorted = useRef(false); // flag to check if the array is sorted
     const intervalId= useRef(null); // interval id for the sorting animation
    const svgRef = useRef();

    // This effect resets the array on component mount
    useEffect(() => {
        resetArray();
    }, []);
    // This effect runs when the 'array' state changes
    useEffect(() => {
        if (array && array.length > 0)
            drawBars();
        // return () => {
        //     if (intervalId) {
        //         clearInterval(intervalId);
        //     }
        // };
    }, [array]);


    // Function to generate a new array of random numbers
    const resetArray = () => {
        const newArray = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100) + 5);
        setArray(newArray);
    };

    // Function to draw bars using D3.js
    const drawBars = () => {
        const svg = d3.select(svgRef.current);
        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;
        const barWidth = width / array.length;

        // Clear the SVG
        svg.selectAll("*").remove();

        // Bind data to rects
        svg.selectAll("rect")
            .data(array)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => height - d)
            .attr("width", barWidth)
            .attr("height", d => d)
            .attr('fill', (d, i) => i === currentStep || i === currentStep + 1 ? 'red' : 'steelblue'); // Highlight compared elements
    };

    // Function need to be refined.
    const bubbleSortStep = (arr) => {
        let madeSwap = false;
        // Adjust the loop to ensure it doesn't stop after the first iteration
        if (currentStep < arr.length - 1) {
          for (let i = 0; i < arr.length - currentStep - 1; i++) {
            if (arr[i] > arr[i + 1]) {
              [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; // Swap elements
              madeSwap = true;
              setCurrentStep(currentStep => currentStep + 1); // Ensure the step is incremented
              break; // Break after the swap for visualization
            }
          }
          if (!madeSwap) {
            // If no swaps were made in the last pass, the array is sorted
            sorted.current=true;
            clearInterval(intervalId.current);
            intervalId.current = null;
          }
        } else {
          // If currentStep has reached the end, ensure sorting stops
          sorted.current= true;
          clearInterval(intervalId.current);
            intervalId.current = null;
        }
        setArray((prev) => [prev,...arr]);
    };
    // Function to handle input change
    const handleAdd = () => {
        const trimmedInput = inputValue.replace(/\s+/g, '');
        const isValidInput = /^(\d+,)*\d+$/.test(trimmedInput);
        setIsValid(isValidInput);
        if (isValidInput) {
            const newArray = trimmedInput.split(",").map((num) => parseInt(num));
            sorted.current = false;
            setArray(newArray);
        }
    };

    const playSort = () => {
        if(!sorted.current && intervalId.current === null){
        intervalId.current = setInterval(() => {
                bubbleSortStep(array);
        }, 1000);
     }else{
        // sorted.current
     }
    };
    const getSorted = () => {
        return sorted.current;
    }
    return (
        <div className="sorting-container">
            <label className='reg-form-label' htmlFor='email'> Input numbers between 1-50 for sorting: </label>
            <input
                type="text"
                className='sorting-input'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter distinct numbers separated by commas"
            />
            <button className='add-button' onClick={handleAdd}>Add Numbers</button>
            {!isValid && <p style={{ color: 'red' }}>Invalid input. Please enter all distinct numbers separated by commas only.</p>}
            <svg id="chart" ref={svgRef} width="60%" height="300px"></svg>
            <div className="controls">
                <button className='add-button' onClick={resetArray}>Reset Array</button>
                <button className='add-button' onClick={playSort}>Start Bubble Sort</button>
            </div>
        </div>
    );
};

export default Bubble;
