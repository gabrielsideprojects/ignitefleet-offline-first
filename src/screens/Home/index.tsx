import { useNavigation } from "@react-navigation/native";
import { HomeHeader } from "../../components/HomeHeader";
import { Container, Content } from "./styles";
import { CarStatus } from "../../components/CarStatus";
import { useQuery, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export function Home(){ 
    const [vehicleInUse,setVehicleInUse] = useState<Historic | null>(null)
    const {navigate} = useNavigation()
    const realm = useRealm()
    const historic = useQuery(Historic)

    function handleRegisterMovement(){
        if(vehicleInUse?._id) {
            return navigate('arrival', {
                id:vehicleInUse._id.toString()
            })
        } else {
            navigate('departure')
        }
       
    }

    function fetchVehicleInUse(){
        try {
            const vehicle = historic.filtered("status = 'departure'")[0]
            setVehicleInUse(vehicle)
        } catch (error) {
            Alert.alert('Veículo em uso', 'Nâo foi possível carregar o veículo em uso.')
            console.log(error)
        }

    }

    useEffect(()=>{
        fetchVehicleInUse()
    },[])

    useEffect(()=>{
        realm.addListener('change', () => fetchVehicleInUse() )

        return () => {
            realm.removeListener('change', fetchVehicleInUse)
        }
    },[])


    return (
    <Container>
        <HomeHeader/>
        <Content>
         <CarStatus licensePlate={vehicleInUse?.license_plate} onPress={handleRegisterMovement}/>
        </Content>
    </Container>

    ) 
}