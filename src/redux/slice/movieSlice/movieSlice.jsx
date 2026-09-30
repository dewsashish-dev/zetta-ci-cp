import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async () => {
    const response = await fetch("https://api.themoviedb.org/3/movie/popular", {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data;
  },
);

export const fetchLatestMovie = createAsyncThunk(
  "movies/fetchLatestMovie",
  async () => {
    const today = new Date().toISOString().split("T")[0];
    const params = new URLSearchParams({
      language: "en-US",
      sort_by: "primary_release_date.desc",
      "primary_release_date.lte": today,
      page: "1",
    });

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?${params}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
          accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data;
  },
);

export const fetchTamilMovie = createAsyncThunk(
  "movies/fetchTamilMovie",
  async () => {
    const params = new URLSearchParams({
      language: "en-US",
      with_original_language: "ta",
      page: "1",
    });

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?${params}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
          accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data;
  },
);

export const fetchShortMovie = createAsyncThunk(
  "movies/fetchShortMovie",
  async () => {
    const params = new URLSearchParams({
      language: "en-US",
      page: "1",
    });

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?${params}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
          accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data;
  },
);

export const fetchLowBudgetMovie = createAsyncThunk(
  "movies/fetchLowBudgetMovie",
  async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
          accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data;
  },
);

export const fetchAllMovie = createAsyncThunk(
  "movies/fetchAllMovie",
  async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
          accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data;
  },
);

export const fetchSingleMovie = createAsyncThunk(
  "movies/fetchSingleMovie",
  async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data;
  },
);

export const fetchSingleCreditMovie = createAsyncThunk(
  "movies/fetchSingleCreditMovie",
  async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
          accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data;
  },
);

export const fetchRecommendedMovies = createAsyncThunk(
  "movies/fetchRecommendedMovies",
  async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
          accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recommended movies");
    }

    const data = await response.json();

    return data.results;
  },
);

export const fetchMovieVideos = createAsyncThunk(
  "movies/fetchMovieVideos",
  async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
          accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie videos");
    }

    const data = await response.json();

    return data.results;
  },
);

export const fetchMovieReleaseDates = createAsyncThunk(
  "movies/fetchMovieReleaseDates",
  async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/release_dates`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
          accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie release dates");
    }

    const data = await response.json();

    return data.results;
  },
);

export const fetchFilteredMovies = createAsyncThunk(
  "movies/fetchFilteredMovies",
  async (filters) => {
    const { search, genre, language, year, sortBy, page = 1 } = filters;

    const params = new URLSearchParams();

    params.append("language", "en-US");
    params.append("page", page);

    if (search?.trim()) {
      params.append("query", search.trim());

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to search movies");
      }

      return await response.json();
    }

    if (genre?.length > 0) {
      params.append("with_genres", genre.join(","));
    }

    if (language?.length > 0) {
      params.append("with_original_language", language.join("|"));
    }

    if (year?.length > 0) {
      params.append("primary_release_year", year[0]);
    }

    if (sortBy?.length > 0) {
      params.append("sort_by", sortBy[0]);
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch filtered movies");
    }

    return await response.json();
  },
);

export const fetchTopRatedMovie = createAsyncThunk(
  "movies/fetchTopRatedMovie",
  async (page = 1) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`,
          accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie release dates");
    }

    const data = await response.json();

    return data.results;
  },
);

const movieSlice = createSlice({
  name: "movies",

  initialState: {
    loading: true,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPopularMovies.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchLatestMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchLatestMovie.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchLatestMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchTamilMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTamilMovie.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchTamilMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchShortMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchShortMovie.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchShortMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchLowBudgetMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchLowBudgetMovie.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchLowBudgetMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchAllMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAllMovie.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchAllMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchSingleMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSingleMovie.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchSingleMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchSingleCreditMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSingleCreditMovie.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchSingleCreditMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchRecommendedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRecommendedMovies.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchRecommendedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchMovieVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMovieVideos.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchMovieVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchMovieReleaseDates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMovieReleaseDates.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchMovieReleaseDates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchTopRatedMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTopRatedMovie.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchTopRatedMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchFilteredMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchFilteredMovies.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchFilteredMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
