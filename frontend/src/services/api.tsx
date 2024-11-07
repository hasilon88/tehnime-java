import axios from "axios";
import error from "../components/error";

class API {
	static domain = "http://localhost";
	static port = 6969;

	static endpoints = {
		data: {
			landingPage: `${this.domain}:${this.port}/data/landing`,
			descriptionPage: `${this.domain}:${this.port}/data/description`,
			getEpisode: `https://anime-api-final.vercel.app/anime/gogoanime/watch/`,
			searchAnime: `https://anime-api-final.vercel.app/anime/gogoanime/{animeName}?page={pageNumber}`
		},

		user: {
			login: `${this.domain}:${this.port}/user/login`,
			signup: `${this.domain}:${this.port}/user/sign-up`,
			modifyDetails: `${this.domain}:${this.port}/user/modify`,
			changePassword: `${this.domain}:${this.port}/user/change-pwd`,
			forgotPassword: `${this.domain}:${this.port}/user/forgot-pwd`,
			verifyToken: `${this.domain}:${this.port}/user/verification-token`,
			resetPwd: `${this.domain}:${this.port}/user/reset-pwd`,


			watchlist: `${this.domain}:${this.port}/user/watchlist`,
			history: `${this.domain}:${this.port}/user/history`,

			addAnime: `${this.domain}:${this.port}/user/add-anime`,
			deleteAnime: `${this.domain}:${this.port}/user/delete-anime`,
			addEpisode: `${this.domain}:${this.port}/user/add-episode`,
			markEpisodeAsCompleted: `${this.domain}:${this.port}/user/mark-as-completed-episode`
		},
	};

	static async getLandingData() {
		try {
			const response = await axios.get(this.endpoints.data.landingPage);

			return {
				response: response.status,
				data: response.data,
			};
		} catch (error) {
			console.error("Error fetching landingData:", error);
			return null;
		}
	}

	static async getDescriptionData(animeId: string) {
		try {
			const response = await axios.get(
				`${this.endpoints.data.descriptionPage}/${animeId}`
			);

			return {
				response: response.status,
				data: response.data,
			};
		} catch (error) {
			console.error("Error fetching descriptionData:", error);
			return null;
		}
	}

	static async userLogin(email: string, password: string) {
		const payload = {
			email: email,
			password: password,
		};

		try {
			const response = await axios.post(this.endpoints.user.login, payload);

			return {
				response: response?.status,
				data: {
					id: response?.data.value.id,
					email: response?.data.value.emailEncrypted,
					firstName: response?.data.value.firstName,
					lastName: response?.data.value.lastName,
					watchlist: response?.data.value.watchlist,
					history: response?.data.value.history,
				},
			};
		} catch (error) {
			console.error("Error logging in user:", error);
			return {
				response: 401,
				data: error,
			};
		}
	}

	static async resetPwd(idUser:String,userPassword:String){
		axios.patch(this.endpoints.user.resetPwd,{
			userId: idUser,
			newPwd:userPassword
		}).then((res)=> console.log("Password reset : ", res.data))
			.catch((error) => {
			console.error("Error change password for user :", error);
		})

	}
	static async userSignup(firstName: string, lastName: string, email: string, password: string) {
		const payload = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
		};

		try {
			const response = await axios.post(this.endpoints.user.signup, payload);

			return {
				response: response?.status,
				data: response?.data.value,
			};
		} catch (error) {
			console.error("Error signing up user:", error);
			return null;
		}
	}


	static async editUser(userId: number, firstName: string, lastName: string, email: string) {
		const payload = {
			userId: userId,
			firstName: firstName,
			lastName: lastName,
			email: email,
		};

		try {
			const response = await axios.post(
				this.endpoints.user.modifyDetails,
				payload
			);

			return {
				response: response?.status,
				data: response?.data.value,
			};
		} catch (error) {
			console.error("Error editing user:", error);
			return null;
		}
	}

	static async changePassword(userId: number, email: string, oldPassword: string, newPassword: string) {
		const payload = {
			userId: userId,
			email: email,
			oldPassword: oldPassword,
			newPassword: newPassword,
		};

		try {
			const response = await axios.patch(
				this.endpoints.user.changePassword,
				payload
			);

			return {
				response: response?.status,
				data: response?.data.value,
			};
		} catch (error) {
			console.error("Error changing password:", error);
			return null;
		}
	}

	static async getWatchlist(userId: number) {
		try {
			const response = await axios.get(this.endpoints.user.watchlist, {
				params: {
					userId: userId,
				},
			});

			return {
				response: response?.status,
				data: response?.data.value,
			};
		} catch (error) {
			console.error("Error fetching watchlist:", error);
			return null;
		}
	}

	static async getHistory(userId: number) {
		try {
			const response = await axios.get(this.endpoints.user.history, {
				params: {
					userId: userId,
				},
			});

			return {
				response: response?.status,
				data: response?.data.value,
			};
		} catch (error) {
			console.error("Error fetching history:", error);
			return null;
		}
	}

	static async addAnimeToWatchlist(userId: number, animeId: string, imageUrl: string) {
		const payload = {
			userId: userId,
			animeId: animeId,
			image: imageUrl,
		};

		try {
			const response = await axios.post(this.endpoints.user.addAnime, payload);

			return {
				response: response?.status,
				data: response?.data.value,
			};
		} catch (error) {
			console.error("Error adding anime to watchlist:", error);
			return null;
		}
	}

	static async deleteAnimeFromWatchlist(userId: number, animeId: string) {
		try {
			const response = await axios.delete(this.endpoints.user.deleteAnime, {
				data: {
					userId: userId,
					animeId: animeId,
					image: "",
				},
			});

			return {
				response: response?.status,
				data: response?.data.value,
			};
		} catch (error) {
			console.error("Error deleting anime from watchlist:", error);
			return null;
		}
	}

	static async addEpisodeToHistory(userId: number, episodeId: string, resumeTime: number, image: string) {
		const payload = {
			userId: userId,
			episodeId: episodeId,
			resumeTime: resumeTime,
			image: image,
		};

		try {
			const response = await axios.post(
				this.endpoints.user.addEpisode,
				payload
			);

			return {
				response: response?.status,
				data: response?.data.value,
			};
		} catch (error) {
			console.error("Error adding episode to history:", error);
			return null;
		}
	}

	static async deleteEpisodeFromHistory(userId: number, episodeId: string) {
		const payload = {
			userId: userId,
			episodeId: episodeId
		};

		try {
			const response = await axios.post(
				this.endpoints.user.markEpisodeAsCompleted, 
				payload
			);

			return {
				response: response?.status,
				data: response?.data.value,
			};
		} catch (error) {
			console.error("Error marking episode as completed:", error);
			return null;
		}
	}

	static async getEpisode(episodeId: string) {
		try {
			const response = await axios.get(
				`${this.endpoints.data.getEpisode}${episodeId}`
			);

			return {
				response: response?.status,
				data: {
					download: response?.data.download,
					low: response?.data.sources[0].url,
					medium: response?.data.sources[1].url,
					high: response?.data.sources[2].url,
					ultra: response?.data.sources[3].url,
					default: response?.data.sources[4].url,
					backup: response?.data.sources[5].url,
				},
			};
		} catch (error) {
			console.error("Error fetching episode:", error);
			return null;
		}
	}

	static async search(query: string, page: number) {
		try {
			const response = await axios.get(
				this.endpoints.data.searchAnime.replace("{animeName}", `${query}`).replace("{pageNumber}", `${page}`)
			);

			return {
				response: response?.status,
				data: {
					currentPage: page,
					hasNextPage: response?.data.hasNextPage,
					results: response?.data.results,
				},
			};
		} catch (error) {
			console.error("Error fetching search query:", error);
			return null;
		}
	}

	static regex = /^[^0-9!@#$%^&*()_+={}[\]:;"'<>,.?/|\\`~-][^!@#$%^&*()_+={}[\]:;"'<>,.?/|\\`~-]*$/;
	static regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
}

export default API;