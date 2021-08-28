import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { animated, useSpring } from "react-spring";
import useDarkMode from "../../constants/useDarkMode";
import { toggleDarkMode } from "../../redux/actions/userInfoActions";
import { State } from '../../redux/reduxTypes';



const AnimatedIcon = () => {

  const [colorTheme, setTheme] = useDarkMode();

  const properties = {
    sun: {
      r: 9,
      transform: "rotate(40deg)",
      cx: 12,
      cy: 4,
      opacity: 0
    },
    moon: {
      r: 5,
      transform: "rotate(90deg)",
      cx: 30,
      cy: 0,
      opacity: 1
    }
  };

  const { r, transform, cx, cy, opacity } = properties[
    colorTheme === 'light' ? "sun" : "moon"
  ];
  
  const svgContainerProps = useSpring({ transform });
  const centerCircleProps = useSpring({ r });
  const maskedCircleProps = useSpring({ cx, cy });
  const linesProps = useSpring({ opacity });
  
  const darkMode = useSelector((state: State) => state.userInfo.darkMode);
  const dispatch = useDispatch();
  let theme: string | null = null; 

  if (typeof window !== "undefined"){
      theme = localStorage.theme;
  }

  React.useEffect(() => {
    if (theme && theme === 'dark' && darkMode === false){
      dispatch(toggleDarkMode());
    }
  }, [])



  return (
    <animated.svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="currentColor"
      onClick={() => {
        setTheme(colorTheme);
        dispatch(toggleDarkMode());

        }}
      style={{
        marginTop: 2,
        marginRight: 10,
        cursor: "pointer",
        ...svgContainerProps
      }}
    >
      <mask id="myMask2">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <animated.circle style={maskedCircleProps as any} r="9" fill="black" />
      </mask>

      <animated.circle
        cx="12"
        cy="12"
        style={centerCircleProps as any}
        fill="black"
        mask="url(#myMask2)"
      />
      <animated.g stroke="currentColor" style={linesProps}>
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </animated.g>
    </animated.svg>
  );
};

export default AnimatedIcon;