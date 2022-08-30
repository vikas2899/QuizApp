import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

import "./Start.css";
import axios from "axios";
import Banner from "../../ques.jpeg";

const Start = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [categoriesData, setCategoryData] = useState([]);
  const [categories, setCategory] = useState([]);
  const [selectedCat, setSelectedCat] = useState("General Knowledge");
  const [difficulty, setDifficulty] = useState("Easy");
  const [catLoading, setCatLoading] = useState(true);
  const [error, setError] = useState(false);
  let categoryCode = 9;

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await axios.get("https://opentdb.com/api_category.php");
      const data = response.data.trivia_categories;
      const categories = data.map((d) => {
        return d.name;
      });
      setCategoryData(data);
      setCategory(categories);
      setCatLoading(false);
    };
    fetchCategory();
  }, []);

  const handleCategory = (e) => {
    setSelectedCat(e.target.value);
  };

  const handleDifficulty = (e) => {
    setDifficulty(e.target.value);
  };

  const handleSubmit = () => {
    if (username === "") {
      setError(true);
      return;
    } else {
      setError(false);
      categoriesData.forEach((cat) => {
        if (cat.name === selectedCat) {
          categoryCode = cat.id;
        }
      });
      navigate("/quiz", {
        state: {
          name: username,
          category: selectedCat,
          difficulty: difficulty.toLowerCase(),
          categoryCode: categoryCode,
        },
      });
    }
  };

  return (
    <div className="start-container">
      <div className="main-menu-container">
        <div className="main-inputs">
          {!catLoading ? (
            <>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="text-field"
                style={{ marginBottom: 10 }}
              />
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCat}
                onChange={(e) => handleCategory(e)}
                label="Category"
                required
                className="text-field"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat} className="text-field">
                    {cat}
                  </MenuItem>
                ))}
              </Select>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={difficulty}
                label="Difficulty"
                onChange={(e) => handleDifficulty(e)}
                className="text-field"
                required
              >
                <MenuItem key="Easy" value="Easy" style={{ width: 400 }}>
                  Easy
                </MenuItem>
                <MenuItem key="Medium" value="Medium" style={{ width: 400 }}>
                  Medium
                </MenuItem>
                <MenuItem key="Hard" value="Hard" style={{ width: 400 }}>
                  Hard
                </MenuItem>
              </Select>
              <Button
                variant="contained"
                className="text-field"
                onClick={() => handleSubmit()}
              >
                Start
              </Button>
              {error ? (
                <Alert severity="warning" style={{ width: 400, marginTop: 10 }}>
                  Please select all the options.
                </Alert>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
      <div className="image-container">
        <img src={Banner} alt="quiz-img" className="banner-img" />
      </div>
    </div>
  );
};

export default Start;
