import React, {useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import {Link} from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/md';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';


const Home = () => {
  const [books, setBooks] = useState([]);
  cosnt [loading, setLoading] = useState(false);

  useEffect(() => {
    
  })
  return (
    <div>Home</div>
  )
}

export default Home