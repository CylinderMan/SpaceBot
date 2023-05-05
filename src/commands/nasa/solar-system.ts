import { ApplicationCommandOptionType, EmbedBuilder, CommandInteractionOption } from "discord.js";
import { CommandDefinition } from "../../handlers/handleCommands";

const API_URL = "https://api.le-systeme-solaire.net/rest/bodies/";

interface PlanetInfo {
  name: string;
  englishName: string;
  isPlanet: boolean;
  semimajorAxis: number;
  gravity: number;
  meanRadius: number;
  mass: {
    massValue: number;
    massExponent: number;
  };
  density: number;
  avgTemp: string,
  discoveredBy: string;
  discoveryDate: string;
  thumbnailUrl: string;
}

async function getPlanetInfo(name: string): Promise<PlanetInfo> {
    const response = await fetch(API_URL + name);
    const data = await response.json();
    return {
      name: data.englishName,
      englishName: data.englishName,
      isPlanet: data.isPlanet,
      semimajorAxis: data.semimajorAxis,
      gravity: data.gravity,
      meanRadius: data.meanRadius,
      mass: {
        massValue: data.mass.massValue,
        massExponent: data.mass.massExponent,
      },
      density: data.density,
      avgTemp: data.avgTemp,
      discoveredBy: data.discoveredBy || "Unknown",
      discoveryDate: data.discoveryDate || "Unknown",
      thumbnailUrl: data.thumbnailUrl
    };
  }
  

function formatMass(mass: number): string {
  if (mass < 0.001) {
    return `${mass * 1000} grams`;
  } else if (mass > 1000) {
    return `${mass / 1000} metric tons`;
  } else {
    return `${mass} kilograms`;
  }
}

function formatDistance(distance: number): string {
  if (distance > 1) {
    return `${distance} astronomical units`;
  } else {
    return `${distance * 149597870.7} kilometers`;
  }
}

export default new CommandDefinition({
  name: "solar-system",
  description: "Displays information about the planets in our solar system",
  options: [
    {
      name: "planet",
      type: ApplicationCommandOptionType.String,
      description: "The name of the planet to display information about",
      required: true,
      choices: [
        { name: "Mercury", value: "mercury" },
        { name: "Venus", value: "venus" },
        { name: "Earth", value: "earth" },
        { name: "Mars", value: "mars" },
        { name: "Jupiter", value: "jupiter" },
        { name: "Saturn", value: "saturn" },
        { name: "Uranus", value: "uranus" },
        { name: "Neptune", value: "neptune" },
        { name: "Pluto", value: "pluto" },
      ],
    },
  ],
  execute: async ({ interaction }) => {
    const planetOption = interaction.options.get("planet") as CommandInteractionOption;
    const planetName = planetOption.value as string;
    const planetInfo = await getPlanetInfo(planetName);

    const embed = new EmbedBuilder()
    .setTitle(planetInfo.englishName)
    .setImage(planetInfo.thumbnailUrl)
    .setColor(`#3342AE`)
    .addFields(
      { name: 'Type', value: planetInfo.isPlanet ? 'Planet' : 'Moon' },
      { name: 'Gravity', value: `${planetInfo.gravity} m/s²` },
      { name: 'Radius', value: `${planetInfo.meanRadius} km` },
      { name: 'Mass', value: formatMass(planetInfo.mass.massValue * 10 ** planetInfo.mass.massExponent) },
      { name: 'Density', value: `${planetInfo.density} g/cm³` },
      { name: 'AvgTemp', value: `${planetInfo.avgTemp}°` },
      { name: 'Discovered By', value: planetInfo.discoveredBy },
      { name: 'Discovery Date', value: planetInfo.discoveryDate },
    );

    if (planetInfo.isPlanet) {
      embed.addFields(
        {name: "Distance from Sun", value: `${formatDistance(planetInfo.semimajorAxis)}`}
      )
    } else {
      embed.addFields(
        {name: "Distance from Parent", value: `${formatDistance(planetInfo.semimajorAxis)}`}
      )
    }

    await interaction.followUp({ embeds: [embed] });
  },
});
