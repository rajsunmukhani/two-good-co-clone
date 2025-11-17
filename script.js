var tl = gsap.timeline()
function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


tl.from(".purple p", {scale: 0.3, rotation:45, autoAlpha: 0, ease: "power2"})
  .from(".line-3", {scaleX: 0, transformOrigin: "left center", ease: "none"}, 0)
  .to(".purple", {backgroundColor: "#28a92b"}, 0);



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function animations(){

tl.from(".nav a, .nav i",{
    y : -20,
    opacity : 0,
    stagger : 0.1,
})

tl.from(".center h1",{
    y : 500,
    stagger : 0.2
})

gsap.to(".logo svg",{
    y : -85,
    scrollTrigger:{
        scroller : "body",
        trigger : ".logo",
        // markers : true,
        start : "top -5%",
        end : "top - 10%",
        scrub: 1
    }
})

gsap.to(".links",{
    y : -30,
    height : 0,
    opacity : 0,
    scrollTrigger:{
        scroller : "body",
        trigger : ".links",
        // markers : true,
        start : "top -5%",
        end : "top - 10%",
        scrub: 2
    }

})


gsap.to(".images-img .text",{
    y:375,
    scrollTrigger : {
        scroller : "body",
        trigger : ".images-img",
        // markers : true,
        start : "top 70%",
        end : "top -170%",
        scrub : 2
    }
})

gsap.from("#page8 .logo svg>path",{
    opacity : 0,
    scale : 1.2,
    stagger : 1,
    scrollTrigger : {
        trigger : "#page8",
        scroller : "body",
        // markers : true,
        start : "top 50%",
        end : "top 35%",
        scrub : true
    }    
})

var crsr = document.querySelector("#pointer")

document.querySelector("#videoCont")
.addEventListener("mousemove",function(dets){
    gsap.to(crsr,{
        top : dets.y - 90 + "px",
        left : dets.x- 65 + "px",
        duaration : .2,
        ease : Expo,
        opacity : 1
    });
    
})

document.querySelector("#videoCont")
.addEventListener("mouseenter",function(dets){
    gsap.to(crsr,{
        top : dets.y + "px",
        left : dets.x + "px" ,
        opacity : 1
    });
})

document.querySelector("#videoCont")
.addEventListener("mouseleave",function(){
    gsap.to(crsr,{
        opacity : 0,
    });
})

}




// loco()
animations()


















