'use client'
import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { userProfileI } from "@/app/profile/page";
import { getProfile } from "@/lib/api";

interface TagsInputProps {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagsInput = ({ tags, setTags }: TagsInputProps) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [userProfile, setUserProfile] = useState<userProfileI>({
        name: '',
        birthday: '',
        height: undefined,
        weight: undefined,
        interests: []
    });


    // Fetch profile data and initialize tags
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile();
                setUserProfile(profile.data);

                // Initialize tags with interests from profile
                if (profile.data.interests) {
                    setTags(profile.data.interests);
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };
        fetchProfile();
    }, [setTags]);

    // Handle Enter key to add a new tag
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            if (!tags.includes(inputValue)) {
                setTags((prevTags) => [...prevTags, inputValue.trim()]);
                setInputValue("");
            }
        }
    };

    // Remove a tag
    const removeTag = (tagToRemove: string): void => {
        setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="flex flex-wrap gap-2 p-2 bg-gradient-start rounded-md">
            {tags.map((tag, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2 px-2 py-1 text-white bg-gray-600 rounded-full"
                >
                    <span>{tag}</span>
                    <button
                        onClick={() => removeTag(tag)}
                        className="text-sm font-bold text-white hover:text-red-500"
                    >
                        ×
                    </button>
                </div>
            ))}
            <input
                type="text"
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setInputValue(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Add a tag"
                className="flex-1 bg-transparent border-none focus:outline-none text-white placeholder-gray-400"
            />
        </div>
    );
};

export default TagsInput;
