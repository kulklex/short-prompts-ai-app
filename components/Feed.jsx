"use client"

import React, { useState, useEffect } from 'react'
import PromptCard from './PromptCard'
import Loading from './Loading'

export default function Feed() {
  const [searchText, setSearchText] = useState("")
  const [searchTimeout, setSearchTimeout] = useState()
  const [searchedResults, setSearchedResults] = useState()
  const [posts, setPosts] = useState()


  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };


  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
    }

    fetchPosts()
  }, [posts])  


  const PromptCardList = ({data, handleTagClick}) => {
    return (
      <div className="mt-16 prompt_layout">
        {data.map((item) => (
          <PromptCard 
            key={item._id}
            post={item}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    )
  }

  if (!posts.length) return <Loading />

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input "
        />
      </form>

      <PromptCardList 
        data={searchText ? searchedResults :  posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}
