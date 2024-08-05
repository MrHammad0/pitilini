import React from 'react'; // Ensure React is imported
import NavBar from './navBar';
import Footer from './footer';
import './landing.scss';
import { FaBehance, FaDribbble } from 'react-icons/fa';
import { IoMailOutline, IoChevronForwardCircle, IoStar } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';
import Card from './CardComp/Card';

let easeing = [0.6,-0.05,0.01,0.99];

const stagger = {
  animate:{
    transition:{
      delayChildren:0.4,
      staggerChildren:0.2,
      staggerDirection:1
    }
  }
}

const fadeInUp ={
  initial:{
    y:-60,
    opacity:0,
    transition:{
      duration:0.6, ease:easeing
    }
  },
  animate:{
    y:0,
    opacity:1,
    transition:{
      duration:0.6,
      delay:0.5,
      ease:easeing
    }
  }
};

const transition ={duration:1.4,ease:[0.6,0.01,-0.05,0.9]}

const firstName = {
  initial:{
    y:-20,
  },
  animate:{
    y:0,
    transition:{
      delayChildren:0.4,
      staggerChildren:0.04,
      staggerDirection:-1
    }
  }
}

const lastName = {
  initial:{
    y:-20,
  },
  animate:{
    y:0,
    transition:{
      delayChildren:0.4,
      staggerChildren:0.04,
      staggerDirection:1
    }
  }
}

const letter = {
  initial:{
    y:400,
  },
  animate:{
    y:0,
    transition:{duration:1, ...transition}
  }
}

const btnHGroup={
  initial:{
    y:-60,
    opacity:0,
    transition:{duration:0.6, ease:easeing}
  },
  animate:{
    y:0,
    opacity:1,
    animation:{
      duration:0.6,
      ease:easeing
    }
  }
};

const star = {
  initial:{
    y:60,
    opacity:0,
    transition:{duration:0.8, ease:easeing}
  },
  animate:{
    y:0,
    opacity:1,
    animation:{
      duration:0.6,
      ease:easeing
    }
  }
}

const header = {
  initial:{
    y:-60,
    opacity:0,
    transition:{duration:0.05, ease:easeing}
  },
  animate:{
    y:0,
    opacity:1,
    animation:{
      duration:0.6,
      ease:easeing
    }
  }
}


function Home() {
  return (
    <>
      <NavBar />
      <br />
      <br />

      <motion.div initial='initial' animate='animate'>
      <motion.div className='content_wrapper' initial={{opacity:0,scale:0}} animate={{opacity:1, scale:1}} transition={{duration:0.3, ease:easeing}}>
        <div className='left_content_wrapper'>

          <motion.h2>

            <motion.span variants={firstName} initial="initial" animate="animate" className='first'>
              <motion.span variants={letter}>S</motion.span>
              <motion.span variants={letter}>t</motion.span>
              <motion.span variants={letter}>a</motion.span>
              <motion.span variants={letter}>r</motion.span>
              <motion.span variants={letter}>t</motion.span>
              <motion.span variants={letter} className='second'>W</motion.span>
              <motion.span variants={letter}>i</motion.span>
              <motion.span variants={letter}>t</motion.span>
              <motion.span variants={letter}>h</motion.span>
              <motion.span variants={letter} className='second'>U</motion.span>
              <motion.span variants={letter}>s</motion.span>
            </motion.span>
          </motion.h2>

          <motion.p variants={fadeInUp}>Automatically find and deposit funds in the best performing 
            <br />
            vaults in the market at any given time.</motion.p>

          

          <motion.div className='review_container' variants={stagger}>
            <motion.p className='total_review' variants={star}>150+ Reviews</motion.p>
            <IconContext.Provider value={{ color: "#fff", size: "18px" }}>
              <motion.span variants={star} whileHover={{scale:1.2 , rotate:180 , borderRadius:"100%" , cursor:"pointer"}}><IoStar /></motion.span>
              <motion.span variants={star} whileHover={{scale:1.2 , rotate:180 , borderRadius:"100%" , cursor:"pointer"}}><IoStar /></motion.span>
              <motion.span variants={star} whileHover={{scale:1.2 , rotate:180 , borderRadius:"100%" , cursor:"pointer"}}><IoStar /></motion.span>
              <motion.span variants={star} whileHover={{scale:1.2 , rotate:180 , borderRadius:"100%" , cursor:"pointer"}}><IoStar /></motion.span>
              <motion.span variants={star} whileHover={{scale:1.2 , rotate:180 , borderRadius:"100%" , cursor:"pointer"}}><IoStar /></motion.span>
            </IconContext.Provider>
            <motion.p className='more_review' variants={star}>More than 500+ people taking services.</motion.p>
          </motion.div>
        </div>

        <motion.div className='right_content_wrapper'>
          <motion.img src='/ls.jpg' initial={{x:200 , opacity:0}} animate={{x:0 , opacity:1}} transition={{duration:.5,delay:0.8}}/>
        </motion.div>
      </motion.div>

      
      <Card />

    </motion.div>

      <br />
      <br />

      <Footer />

    </>
  );
}

export default Home;
