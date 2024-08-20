import React from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import CurrencyIcon from "../icons/CurrencyIcon";
import TimeIcon from "../icons/TimeIcon";

import Academy from "../../assets/buildings/academy.png";
import Farm from "../../assets/buildings/farm.png";
import Barracks from "../../assets/buildings/barracks.png";
import Headquarters from "../../assets/buildings/headquarters.png";
import LumberMill from "../../assets/buildings/lumbermill.png";
import Placeholder from "../../assets/buildings/placeholder.png";

// The ConfigCard component displays information about a building configuration
const ConfigCard = ({ config }) => {
  // Mapping of building types to their corresponding images
  const buildingTypeToImage = {
    Academy: Academy,
    Farm: Farm,
    Barracks: Barracks,
    Headquarters: Headquarters,
    "Lumber Mill": LumberMill,
  };

  return (
    // Card container with a maximum width of 400px and no shadow
    <Card className="max-w-[400px] mb-4" shadow="none">
      {/* CardHeader displays the building type name and its image */}
      <CardHeader className="flex justify-center items-center flex-col">
        <h3 className="text-2xl font-bold text-center mb-4">
          {config.buildingType}
        </h3>
        <img
          src={buildingTypeToImage[config.buildingType] || Placeholder}
          alt="academy"
          className="w-48"
        />
      </CardHeader>
      {/* CardBody displays the building cost and construction time with icons */}
      <CardBody className="flex flex-row justify-center gap-10">
        <div className="flex gap-2 items-center">
          <span className="text-warning">
            <CurrencyIcon />
          </span>
          <p>{config.buildingCost}</p>
        </div>
        <div className="flex gap-2 items-center">
          <span>
            <TimeIcon />
          </span>
          <p>{config.constructionTime}</p>
        </div>
      </CardBody>
      {/* Divider separates the content within the card */}
      <Divider />
    </Card>
  );
};

export default ConfigCard;
