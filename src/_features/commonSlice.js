import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../_interceptor/customAxios"

const initialState = {
  state: [],
  services: [],
  isLoading: false,
  message: null,
  selectedService: JSON.parse(localStorage.getItem("selectedItem")) || {},
}

export const getServices = createAsyncThunk(
  "/services",
  async (_, thunkApi) => {
    try {
      const response = await axios.post("/services/all")
      return response?.data
    } catch (err) {
      return thunkApi({ message: err?.message })
    }
  }
)

export const stateGet = createAsyncThunk(
  "/services/state-all",
  async (_, thunkApi) => {
    try {
      const response = await axios.post("/services/state-all")
      return response?.data
    } catch (err) {
      return thunkApi.rejectWithValue({ message: err?.message })
    }
  }
)

const authSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    selectService: (state, actions) => {
      state.selectedService = actions.payload
      localStorage.setItem(
        "selectedItem",
        JSON.stringify(state.selectedService)
      )
    },
    removeService: (state) => {
      state.selectedService = {}
      localStorage.removeItem("selectedItem")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(stateGet.pending, (state) => {
        state.isLoading = true
      })
      .addCase(stateGet.fulfilled, (state, action) => {
        state.isLoading = false
        state.state = action?.payload?.data
      })
      .addCase(stateGet.rejected, (state) => {
        state.isLoading = false
        state.state = null
      })
      .addCase(getServices.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.isLoading = false
        state.services = action?.payload?.data
      })
      .addCase(getServices.rejected, (state) => {
        state.isLoading = false
        state.services = null
      })
    // .addCase(getServicesSingle.pending, (state) => {
    //   state.isLoading = true
    // })
    // .addCase(getServicesSingle.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   state.selectedService = action?.payload?.data
    // })
    // .addCase(getServicesSingle.rejected, (state) => {
    //   state.isLoading = false
    //   state.selectedService = null
    // })
  },
})

// Action creators are generated for each case reducer function
export const { userReset, selectService, removeService } = authSlice.actions

export const getServicesSingle = createAsyncThunk(
  "/services/single",
  async (id, thunkApi) => {
    try {
      const response = await axios.post(`/services/single-service/${id}`)
      thunkApi.dispatch(selectService(response.data?.data))
      return response?.data
    } catch (err) {
      return thunkApi({ message: err?.message })
    }
  }
)

export default authSlice.reducer
