import React, { useState } from 'react';
import './Favorites.css';


function Favorites(props) {
    const [title, setTitle] = useState('Новый список');
    const [isSbm, setIsSbm] = useState(false);
    const [movies, setMovies] = useState([
        { imdbID: 'tt0068646', title: 'The Godfather', year: 1972 }
    ])

    const favoriteChangeHandler = (e) => {
        this.setState({ title: e.target.value });
        if (document.querySelector(`.${e.target.className}`).value.length > 0) {
            document.querySelector(`.${e.target.parentElement.className}`).querySelector(".favorites__save").style.backgroundColor = "#496ddb";
            document.querySelector(`.${e.target.parentElement.className}`).querySelector(".favorites__save").style.cursor = "pointer";
        }
        if (document.querySelector(`.${e.target.className}`).value.length === 0) {
            document.querySelector(`.${e.target.parentElement.className}`).querySelector(".favorites__save").style.backgroundColor = "gray";
            document.querySelector(`.${e.target.parentElement.className}`).querySelector(".favorites__save").style.cursor = "not-allowed";
        }
        if (document.querySelectorAll(`.${e.target.className}`)[1]) {
            document.querySelector(`.main-page__favorites`).querySelector(".favorites__save").style.backgroundColor = "#496ddb";
            document.querySelector(`.main-page__favorites`).querySelector(".favorites__save").style.cursor = "pointer";
        }
        if (document.querySelectorAll(`.${e.target.className}`)[1].value.length === 0) {
            document.querySelector(`.main-page__favorites`).querySelector(".favorites__save").style.backgroundColor = "gray";
            document.querySelector(`.main-page__favorites`).querySelector(".favorites__save").style.cursor = "not-allowed";
        }
    };

    const getImdbIDArray = () => {
        let favoritesIDArray = props.favoriteList.map((item) => {
            return item.imdbID;
        });
        return favoritesIDArray;
    };

    const saveListHandler = () => {
        setIsSbm(true);
        props.postList(this.state.title, getImdbIDArray());
    };
    return (
        <div className="favorites">
            <input
                value={title}
                className="favorites__name"
                onChange={favoriteChangeHandler}
                onClick={favoriteChangeHandler}
                placeholder="Введите название списка"
                disabled={!props.favoriteList.length}
            />
            <ul className="favorites__list">
                {props.favoriteList.map((item) => {
                    return (
                        <li key={item.imdbID}>
                            <button
                                className="remove-favorite-movie"
                                onClick={() =>
                                    props.removeMovieFromFavoriteList(item.imdbID)
                                }
                            >
                                X
                            </button>
                            {item.Title} ({item.Year})
                        </li>
                    );
                })}
            </ul>

            {!isSbm ? (
                <button
                    type="button"
                    className="favorites__save"
                    onClick={saveListHandler}
                    disabled={!title.length}
                >
                    Сохранить список
                </button>
            ) : (
                <Link
                    to={"/list/" + props.listID}
                    target="_blank"
                    className="link-to__list"
                >
                    Перейти к списку
                </Link>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        favoriteList: state.favoriteList,
        favoritesIDArray: state.favoritesIDArray,
        listID: state.listID,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeMovieFromFavoriteList: (id) => {
            dispatch(removeMovieFromFavoriteList(id));
        },
        postList: (title, favoritesIDArray) => {
            dispatch(postList(title, favoritesIDArray));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);