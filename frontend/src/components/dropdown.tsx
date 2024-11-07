import React, { useState } from "react";
import { Select, Option } from "@material-tailwind/react";

interface ListUrls {
  low?: string;
  medium?: string;
  high?: string;
  ultra?: string;
  default?: string;
  backup?: string;
  download?: string;
}

interface DropDownListProps {
  list: ListUrls;
  setUrl: (url: string) => void;
}

export const DropDownList: React.FC<DropDownListProps> = ({ list, setUrl }) => {
  const [quality, setQuality] = useState<any>("Ultra");
  
  const allQualities = [
    {name: 'Low', url: list?.low || "n/a"}, 
    {name: 'Medium', url: list?.medium || "n/a"}, 
    {name: 'High', url: list?.high || "n/a"},
    {name: 'Ultra', url: list?.ultra || "n/a"}, 
    {name: 'Default', url: list?.default || "n/a"},
    {name: 'Backup', url: list?.backup || "n/a"}
  ]

  return (
    <div className="w-full text-white">
      <Select
        placeholder={undefined}
        label="Select Quality"
        value={quality}
        className="text-white"
      >
        {allQualities.map((quality, index) => (
          <Option onClick={() => {setUrl(quality.url); setQuality(quality.name)}}>
            {quality.name.charAt(0).toUpperCase() + quality.name.slice(1)}
          </Option>
        ))}
      </Select>
    </div>
  );
};
