import { useNavigate } from "react-router-dom";
import pages from "../pages.json";
import { loadUsers } from "../api/users";
import { Highlight } from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ListComponentProps {
    inputValue: string;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

interface User {
    name: string;
    id: number;
}

export const ListComponent = ({ inputValue, setIsModalOpen }: ListComponentProps) => {
    const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const { categories, subcategories } = pages;


    useEffect(() => {
        const fetchUsers = async () => {
            if (inputValue.startsWith('@')) {
                const user = await loadUsers();
                setLoading(true);
                setUsers(user as User[]);
            } else {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [inputValue]);

    const handleNavigation = (dest: any) => {
        navigate(`/${dest}`.toLowerCase());
        setIsModalOpen(false);
    }

    const renderCategories = () => {

        const filteredCategories = categories.filter(category =>
            category.toLowerCase().includes(inputValue.toLowerCase())
        );

        return filteredCategories.slice(0, 3).map((category, index) => {
            const filteredSubcategories = subcategories.filter(
                (sub) => sub.category === category
            );

            if (filteredSubcategories.length === 0) {
                return (
                    <div key={index} className="list-item" onClick={() => handleNavigation(category)}>
                        <Highlight highlight={inputValue} >{category}</Highlight>
                    </div>
                );
            }

            return (
                <div key={category}>
                    <div className="category">
                        <Highlight highlight={inputValue}>{category}</Highlight>
                    </div>
                    <div>
                        {filteredSubcategories.map((sub, index) => (
                            <div key={index} className="list-item" onClick={() => handleNavigation(sub.name)}>
                                <Highlight highlight={inputValue}>{sub.name}</Highlight>
                            </div>
                        ))
                        }
                    </div>
                </div>
            );
        });
    };

    const renderUsers = () => {
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(inputValue.toLowerCase().slice(1))
        );

        if (filteredUsers.length === 0) {
            return <div>Nothing found</div>;
        }

        return filteredUsers.map((user, index) => (
            <div key={index} className="list-item" onClick={() => handleNavigation(user.id)}>
                <Highlight highlight={inputValue.slice(1)}>{user.name}</Highlight>
            </div>
        ));
    };

    return (
        <div>
            {
                loading ? renderUsers() : (renderCategories())
            }
        </div>
    )
}
