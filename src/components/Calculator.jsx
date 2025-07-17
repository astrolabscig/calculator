import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { setDisplay, resetDisplay } from '../redux/displaySlice'


function Calculator() {
    const [justEvaluated, setJustEvaluated] = useState(false)
    const display = useSelector(state=> state.display)
    const dispatch = useDispatch()

    const handleButtonClick = (num) => {
        if (justEvaluated) {
            if(/[+\-*/]/.test(display.slice(-1))){
                dispatch(setDisplay(display+num))
            }else {
                dispatch(setDisplay(num))
            }
            setJustEvaluated(false)
            return
        }

        if (display === '0'){
            if (num === '0'){
                return
            }else{
                dispatch(setDisplay(num))
            }
        }else {
            dispatch(setDisplay(display + num))
        }
    }


    const handleClear = ()=> {
        dispatch(resetDisplay())
        setJustEvaluated(false)
    }
 

    const handleOperatorClick = (operator)=> {
        if (justEvaluated){
            setJustEvaluated(false)
            dispatch(setDisplay(display+operator))
            return
        }

        const lastChar = display.slice(-1)
        if (/[+\-*/]/.test(lastChar)){
            if (operator === '-' && lastChar !== '-'){
                dispatch(setDisplay(display + '-'))
            }else {
                dispatch(setDisplay(display.replace(/[+\-*/]+$/, operator)))
            }
        }else{
            dispatch(setDisplay(display + operator))
        }
    }


    const handleDecimalClick = ()=> {
        const lastNumber = display.split(/[+\-*/]/).pop()
        if(!lastNumber.includes('.')){
            dispatch(setDisplay(display + '.'))
        }
    }


    const handleEqualsClick = () => {
        try{
            const safeDisplay = display.replace(/[*+-]+$/, '')
            const result = eval(safeDisplay)
            if (result===Infinity || result === -Infinity){
                dispatch(setDisplay('Error'))
            }else{
                dispatch(setDisplay(parseFloat(result.toFixed(6)).toString()))
            }
            setJustEvaluated(true)
        }catch{
            dispatch(setDisplay('Error'))
            setJustEvaluated(true)
        }
    }

    return (
        <div id="calculator">
            <div id="display">{display}</div>

            <button id="equals" onClick={handleEqualsClick}>=</button>

            <button id="zero" onClick={() => handleButtonClick('0')}>0</button>
            <button id="one" onClick={() =>handleButtonClick('1')}>1</button>
            <button id="two" onClick={() =>handleButtonClick('2')}>2</button>
            <button id="three" onClick={() =>handleButtonClick('3')}>3</button>
            <button id="four" onClick={() =>handleButtonClick('4')}>4</button>
            <button id="five" onClick={() =>handleButtonClick('5')}>5</button>
            <button id="six" onClick={() =>handleButtonClick('6')}>6</button>
            <button id="seven" onClick={() =>handleButtonClick('7')}>7</button>
            <button id="eight" onClick={() =>handleButtonClick('8')}>8</button>
            <button id="nine" onClick={() =>handleButtonClick('9')}>9</button>

            <button id="add" onClick={()=> handleOperatorClick('+')}>+</button>
            <button id="subtract" onClick={()=> handleOperatorClick('-')}>-</button>
            <button id="multiply" onClick={()=> handleOperatorClick('*')}>*</button>
            <button id="divide" onClick={()=> handleOperatorClick('/')}>/</button>

            <button id="decimal" onClick={handleDecimalClick}>.</button>

            <button id="clear" onClick={handleClear}>AC</button>
        </div>
    )
}

export default Calculator;