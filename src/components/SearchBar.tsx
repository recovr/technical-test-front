import { Code, Text } from "@mantine/core"
import { SearchIcon } from "../assets"
import "./searchbar.css"
import { Dispatch, SetStateAction } from "react";

interface SearchBarProps {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const SearchBar = ({ setIsModalOpen }: SearchBarProps) => {


    return (
        <div onClick={() => setIsModalOpen(true)} className="input-field">
            <div className="left-part">
                <SearchIcon
                    size={18}
                    style={{ color: '#828282' }}
                />
                <Text c={"#828282"} style={{ marginLeft: 6 }}>Search</Text>
            </div>
            <Code style={{ color: '#C9C9C9', backgroundColor: "#242424", fontWeight: "bold" }}>Ctrl + P</Code>
        </div>
    )
}