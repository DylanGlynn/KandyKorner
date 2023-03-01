import { useEffect, useState } from "react"
import { Fetch } from "../ApiManager"
import "./Locations.css"

export const LocationsList = () => {
    const [locations, setLocations] = useState([])

    const localKandyuser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyuser)

    useEffect(
        () => {
            Fetch("locations","",)
                .then((locationArray) => {
                    setLocations(locationArray)
                })
        },
        []
    )

    return <>
        <h2>Find the Closest Candy!</h2>

        <article className="locations">
            {
                locations.map(
                    (location) => {
                        return <section className="location" key={location.id}>
                            <header><b>{location.name}</b><br></br>
                            Located at {location.address}<br></br>
                            Call them now! {location.phoneNumber}</header>
                            <footer>Gorge yourself on {location.squareFootage} square feet of pure sugar!</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}