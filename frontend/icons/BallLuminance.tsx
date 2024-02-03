import * as React from "react";
import type { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgBallLuminance = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 80 80"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g clipPath="url(#ball-luminance_svg__a)">
      <mask
        id="ball-luminance_svg__b"
        width={80}
        height={80}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}
      >
        <path
          fill="#fff"
          d="M80 40C80 17.909 62.091 0 40 0S0 17.909 0 40s17.909 40 40 40 40-17.909 40-40"
        />
      </mask>
      <g mask="url(#ball-luminance_svg__b)">
        <path fill="#D8D8D8" d="M80 0H0v80h80z" />
        <g filter="url(#ball-luminance_svg__c)">
          <path
            fill="#787878"
            d="m62.212 70.272 26.648-6.728 19.979-20.69-66.395-64.116L7.431 14.995l6.453 19.295 42.533 6.634z"
          />
        </g>
        <g
          filter="url(#ball-luminance_svg__d)"
          style={{
            mixBlendMode: "overlay",
          }}
        >
          <path
            fill="#373737"
            d="m22.8 52.227 17.26 37.561 52.849.642 31.126-77.021-73.376-23.876-5.565 29.025 30.542-6.34 22.37 41.102z"
          />
        </g>
      </g>
    </g>
    <defs>
      <filter
        id="ball-luminance_svg__c"
        width={137.808}
        height={127.934}
        x={-10.769}
        y={-39.462}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_1837_1168"
          stdDeviation={9.1}
        />
      </filter>
      <filter
        id="ball-luminance_svg__d"
        width={137.635}
        height={137.297}
        x={4.6}
        y={-28.667}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_1837_1168"
          stdDeviation={9.1}
        />
      </filter>
      <clipPath id="ball-luminance_svg__a">
        <path fill="#fff" d="M0 0h80v80H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBallLuminance;
