import { useState } from 'react';
import { useRouter } from 'next/router';
import { Input, Button, VStack } from "@chakra-ui/react";

export default function Login(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setPassVis] = useState(true);

    const handleSubmit = async () => {
    }

    return (
        <VStack maxW="500px">
            <Input placeholder="Enter email" variant='outline' size="md" onChange={(e) => {setEmail(e.currentTarget.value)}}></Input>

            <Button variant ="solid" onClick={() => {handleSubmit}}></Button>
        </VStack>
    )
}