import React, {useState} from 'react';
import classes from './Paginator.module.css';
import cn from 'classnames';

let Paginator = ({currentPage, totalItemsCount, pageSize, onPageChanged, portionSize = 10}) => {

    debugger;
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    
    return <div className={classes.paginator}>
        { portionNumber > 1 &&
            <button onClick={() => { setPortionNumber(portionNumber - 1)}} className={classes.btn} >PREV</button>}
        
            {pages
            .filter(p => p >= leftPortionPageNumber && p<= rightPortionPageNumber)
            .map(p => {
                return <div className={cn(classes.pageNumber, {[classes.selectedPage]: currentPage === p})}
                    onClick={(event) => onPageChanged(p)}>{p}</div>
            })}
            { portionCount > portionNumber &&
            <button onClick={() => { setPortionNumber(portionNumber + 1)}} className={classes.btn} >NEXT</button>}
        
    </div>

}

export default Paginator;