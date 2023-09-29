import React, { useEffect, useRef } from 'react'
import './loader.css';

const Loader = (props) => {

    var mainTimerRef = useRef(null)

    var timerRef = useRef(null)
    var timerRef2 = useRef(null)
    var timerRef3 = useRef(null)


    var status = "paused";


    var progress = 0;

    var animate = ()=>{
        if(progress == 100){
        clearInterval(animateGlobal)
        progress = 0;
        return;    
    }
         progress++;   
         timerRef3.current.textContent=progress+"%"
    }

    // setInterval(animate,600)

    var animateGlobal;
   function stopAnimation(){
    status = "paused";
    if(animateGlobal){
     clearInterval(animateGlobal);
    }
    timerRef.current.classList.add('paused')
    timerRef2.current.classList.add('paused')
    mainTimerRef.current.classList.add('paused')



   }

   function startAnimation(){
    status = "start";
    animateGlobal = setInterval(animate,60);
    timerRef.current.classList.remove('paused')
    timerRef2.current.classList.remove('paused')
    mainTimerRef.current.classList.remove('paused')


   }

   function resetAnimation(){

    var el = timerRef.current;
    el.style.animation = 'none';
    // el.offsetHeight = el.offsetHeight; /* trigger reflow */
   // el.style.animation = null; 

     el = timerRef2.current;
    el.style.animation = 'none';
    // el.offsetHeight = el.offsetHeight; /* trigger reflow */
   // el.style.animation = null; 

    el = mainTimerRef.current;
    el.style.animation = 'none';
        // animateGlobal = setInterval(animate,60);
        progress  = 0;


    setTimeout(()=>{
       var el = timerRef.current;
        //el.style.animation = '';
        // el.offsetHeight = el.offsetHeight; /* trigger reflow */
        el.style.animation = null; 
    
         el = timerRef2.current;
        //el.style.animation = '';
        // el.offsetHeight = el.offsetHeight; /* trigger reflow */
        el.style.animation = null; 
    
        el = mainTimerRef.current;
        el.style.animation = null; 
        stopAnimation();

    },10)

   }


   useEffect(()=>{
    // setTimeout(()=>{
    // timerRef.current.classList.add('paused')
    // timerRef2.current.classList.add('paused')
    // },1);
   },[])




    var { width, height, fontSize } = props;
    if (!width)
        width = 70;
    if (!height)
        height = 70;
    if (!fontSize)
        fontSize = 16;

    var clipRect = `rect(0px, ${width}px, ${width}px, ${width/2}px)`
    var clipRectCircle = `rect(0px, ${width/2}px, ${width}px, ${0}px)`

        return (
            <div>
            <div style={{position:"relative",height:"fit-content",minHeight:height+"px",minWidth:width+"px",display:"flex",justifyContent:"center",transform:"rotate(180deg)"}}>
            <div ref = {mainTimerRef} className='loader-main loader-animate paused' style={{width:width+"px",height:height+"px",fontSize:fontSize+"px",zIndex:"100",clip:clipRect}} data-anim="base wrapper" >
            
            <div ref={timerRef} class="loader-circle paused" style={{width:(width-20)+"px",height:(height-20)+"px",fontSize:fontSize+"px",zIndex:"100",clip:clipRectCircle,borderRadius:(width/2)+"px"}} data-anim="base left"></div>
             <div ref={timerRef2} class="loader-circle paused" style={{width:(width-20)+"px",height:(height-20)+"px",fontSize:fontSize+"px",zIndex:"100",clip:clipRectCircle,borderRadius:(width/2)+"px"}} data-anim="base right"></div>
            <div style={{position:"absolute",transform:"translate(-50)"}}>
                {/* <p ref={timerRef3}>{progress}%</p> */}
            </div>
            </div>
            <div  className='' style={{width:width+"px",height:height+"px",fontSize:fontSize+"px",zIndex:"100",clip:clipRect,display:"flex",justifyContent:"center",alignItems:"center"}} data-anim="base wrapper" >
            
            
            <div style={{position:"absolute",transform:"rotate(180deg)"}}>
                <p ref={timerRef3}>{progress}%</p>
            </div>
            </div>
            </div>
            <div style={{margin:"auto"}}>
            <button  className='nav-btns' onClick={()=>{if(status=="paused")startAnimation();}}>Start</button>
            <button  className='nav-btns' onClick={()=>{if(status=="start")stopAnimation();}}>Pause</button>
            <button className='nav-btns' onClick={resetAnimation}>Reset</button>
            </div>
           
            </div>

        )
}

export default Loader