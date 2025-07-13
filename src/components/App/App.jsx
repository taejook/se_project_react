import "./App.css";
import { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItemById,
  likeItem,
  unlikeItem,
} from "../../utils/api";
import { register, authorize, getContent, updateProfile } from "../../utils/auth";
import Header from "./Header/Header";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import Main from "./Main/Main";
import ItemModal from "./ItemModal/ItemModal";
import Footer from "./Footer/Footer";
import AddItemModal from "./AddItemModal/AddItemModal";
import LoginModal from "./LoginModal/LoginModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
import DeleteModal from "./DeleteModal/DeleteModal";
import Profile from "./Profile/Profile";
import ProtectedRoute from "../ProtectedRoutes";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";


function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (values) => {
    authorize(values)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          checkToken();
          closeActiveModal();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // Add a function in auth.js to verify token and get user data
      getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleRegister = (values) => {
    register(values)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          setCurrentUser(data.user);
          closeActiveModal();
        }
      })
      .catch((err) => {
        console.error(err);
        // Here you might want to add some error handling to show to the user
      });
  };

  const handleEditProfile = (values) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      return updateProfile(values, token)
        .then((data) => {
          console.log("Server response:", data);
          if (data) {
            setCurrentUser(data);
            closeActiveModal();
          }
        })
        .catch((err) => {
          console.error(err);
          // Here you might want to add some error handling to show to the user
        });
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleDeleteClick = (card) => {
    setActiveModal("delete");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleDeleteItem = (id) => {
    console.log("handleDeleteItem called with:", id);
    const token = localStorage.getItem("jwt");
    if (token) {
      return deleteItemById(id, token)
        .then(() => {
          const updatedClothingItems = clothingItems.filter(
            (item) => item._id !== id
          );
          setClothingItems(updatedClothingItems);
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    }
  };

  const handleAddItemSubmit = (values) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      return addItem(values, token)
        .then((item) => {
          // add the item on the dom
          setClothingItems([item.data, ...clothingItems]);
          closeActiveModal();
        })
        .catch(console.error);
    }
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array

        // the first argument is the card's id
        likeItem(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        // the first argument is the card's id
        unlikeItem(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.data);
        console.log(data);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      handleLogOut={handleLogOut}
                      handleCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          {isLoggedIn && (
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItem={handleAddItemSubmit}
            />
          )}
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              onDelete={handleDeleteClick}
            />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            onRegister={handleRegister}
            handleRegisterClick={handleRegisterClick}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            onLogin={handleLogin}
            handleLoginClick={handleLoginClick}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onEditProfile={handleEditProfile}
            handleEditProfileClick={handleEditProfileClick}
          />
          <DeleteModal
            isOpen={activeModal === "delete"}
            onClose={closeActiveModal}
            onDelete={handleDeleteItem}
            card={selectedCard}
            clothingItems={clothingItems}
          />
        </CurrentTemperatureUnitContext.Provider>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
