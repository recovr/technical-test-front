import "./spotlight.css"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ListComponent } from "./ListComponent";
import { SearchIcon } from "../assets";

interface SpotlightProps {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const Spotlight = ({ setIsModalOpen }: SpotlightProps) => {
    const [searchValue, setSearchValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }

    return (
        <>
            <div className="blurred-bg" onClick={() => setIsModalOpen(false)} />
            <div className="modal-container">
                <div className="input-container">
                    <SearchIcon size={20} />
                    <input
                        className="input"
                        ref={inputRef}
                        placeholder="Search documentation or users..."
                        onChange={handleValueChange}
                    />
                </div>
                <ListComponent inputValue={searchValue} setIsModalOpen={setIsModalOpen} />
            </div>
        </>
    )
}