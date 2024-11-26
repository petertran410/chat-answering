import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const getTimestamp = (createdAtString: string): string => {
//   const createdAt = new Date(createdAtString);
//   const now = new Date();
//   const secondsAgo = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

//   const intervals = {
//     year: 31536000, // 60 * 60 * 24 * 365
//     month: 2592000, // 60 * 60 * 24 * 30
//     week: 604800, // 60 * 60 * 24 * 7
//     day: 86400, // 60 * 60 * 24
//     hour: 3600, // 60 * 60
//     minute: 60,
//     second: 1,
//   };

//   for (const [unit, secondsInUnit] of Object.entries(intervals)) {
//     const intervalCount = Math.floor(secondsAgo / secondsInUnit);
//     if (intervalCount >= 1) {
//       return `${intervalCount} ${unit}${intervalCount > 1 ? "s" : ""} ago`;
//     }
//   }

//   return "just now";
// };

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  const intervals = {
    year: 31536000, // 60 * 60 * 24 * 365
    month: 2592000, // 60 * 60 * 24 * 30
    week: 604800, // 60 * 60 * 24 * 7
    day: 86400, // 60 * 60 * 24
    hour: 3600, // 60 * 60
    minute: 60,
    second: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const intervalCount = Math.floor(secondsAgo / secondsInUnit);
    if (intervalCount >= 1) {
      return `${intervalCount} ${unit}${intervalCount > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

export function formatAndDivideNumber(number: number): string {
  if (number < 1000) {
    return number.toString();
  } else if (number >= 1000 && number < 1_000_000) {
    return (number / 1000).toFixed(1) + "K";
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
    return (number / 1_000_000).toFixed(1) + "M";
  } else {
    return (number / 1_000_000_000).toFixed(1) + "B";
  }
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
