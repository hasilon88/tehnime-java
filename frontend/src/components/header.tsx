import React, {FC, useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  DialogFooter,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Card,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Avatar
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";


import tehnime from '../assets/logo.png';
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const navListMenuItems = [
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: SquaresPlusIcon,
  },
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
  },
  {
    title: "Blog",
    description: "Find the perfect solution for your needs.",
    icon: Bars4Icon,
  },
  {
    title: "Services",
    description: "Learn how we can help you achieve your goals.",
    icon: SunIcon,
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    icon: GlobeAmericasIcon,
  },
  {
    title: "Contact",
    description: "Find the perfect solution for your needs.",
    icon: PhoneIcon,
  },
  {
    title: "News",
    description: "Read insightful articles, tips, and expert opinions.",
    icon: NewspaperIcon,
  },
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: RectangleGroupIcon,
  },
  {
    title: "Special Offers",
    description: "Explore limited-time deals and bundles",
    icon: TagIcon,
  },
];

interface stateProps {
  user: {
    email: string,
    firstName: string,
    history: [],
    id: number,
    lastName: string,
    watchlist: []
  }
}

const MessageDialog: FC<stateProps> = ({user}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("")
  const [searchResults, setSearchResults] = useState<any>([{}])
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open)
    
    if (searchValue !== "")
      setSearchValue("")

    if (searchResults.length !== 0)
      setSearchResults([])

  };

  useEffect(() => {
    async function fetchResults() {
      let results: any = await API.search(searchValue, 1);

      if (results?.response === 200)
        setSearchResults(results?.data?.results);
      else
        setSearchResults([])
    }

    if (searchValue.trim() === "") {
      setSearchResults([]);
      return;
    }

    fetchResults();
  }, [searchValue])


  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 w-6 h-6 hover:cursor-pointer" onClick={handleOpen}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>

      <Dialog placeholder={undefined} open={open} size="lg" handler={handleOpen} className="h-3/4 overflow-y-auto" style={{scrollbarWidth: "none"}}>
        <div className="flex items-center justify-between">
          <DialogHeader placeholder={undefined} className="flex flex-col items-start">
            {" "}
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5 hover:cursor-pointer"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody placeholder={undefined}>
          <div className="grid gap-6">
            <Input crossOrigin={undefined} size="lg" label="Search Anime" onChange={(ev) => setSearchValue(ev.target.value)} />
          </div>
          {
            searchResults?.length === 0 || searchValue === "" ? <div/> :
              searchResults.map((anime: any) => {
                return (
                  <Card
                      placeholder={undefined}
                      className="w-full mt-5 overflow-hidden outline-black outline"
                      onClick={() => {
                          navigate('/description', {
                              state: {
                                email: user.email,
                                firstName: user.firstName,
                                history: user.history,
                                id: user.id,
                                lastName: user.lastName,
                                watchlist: user.watchlist,
                                animeId: anime?.id
                              }
                            }
                          );

                        window.location.reload();
                      }}
                  >
                    <List placeholder={undefined} className="p-0">
                      <ListItem placeholder={undefined} className="group rounded px-3 py-3 text-sm font-normal text-black hover:bg-black hover:text-white focus:bg-black focus:text-white">
                        <ListItemPrefix placeholder={undefined}>
                          <Avatar placeholder={undefined} variant="rounded" size="xxl" className="h-auto" alt="" src={anime?.image} />
                        </ListItemPrefix>
                        <div className="flex flex-col">
                          <div className="flex">
                          <span id="badge-dismiss-green" className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
                              </svg>

                              <div className="ml-1">
                                {anime?.releaseDate}

                              </div>

                            </span>

                          </div>

                          <Typography variant="h3" placeholder={undefined} className="mt-2 text-xl lg:text-3xl font-bold">
                            {searchValue !== "" && anime?.title}
                          </Typography>
                        </div>

                        <ListItemSuffix placeholder={undefined}>
                          <Chip
                            value={anime.subOrDub}
                            variant="ghost"
                            size="sm"
                            className="rounded-full px-2 py-1 text-xs group-hover:bg-white/20 group-hover:text-white focus:text-white"
                          />
                        </ListItemSuffix>
                      </ListItem>
                    </List>
                  </Card>
                )
              })
          }

        </DialogBody>
        <DialogFooter placeholder={undefined} className="text-center items-center justify-center">
          {searchResults?.length === 0 || searchValue === "" ? <div>No results</div> : <Button placeholder={undefined} variant="outlined" size="md" onClick={() => navigate('/search', {state: {query: searchValue, user: user}})}>View all</Button>}
        </DialogFooter>
      </Dialog>
    </>
  );
}

const NavList: FC<stateProps> = ({user}) => {
  const navigate = useNavigate();

  return (
    <List placeholder={undefined} className="mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        placeholder={undefined}
        as="a"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem placeholder={undefined} className="flex items-center gap-2 py-2 pr-4" onClick={() => navigate('/settings', {
          state: {
            email: user.email,
            firstName: user.firstName,
            history: user.history,
            id: user.id,
            lastName: user.lastName,
            watchlist: user.watchlist
          }
        })}>Settings</ListItem>
      </Typography>
      <Typography
          placeholder={undefined}
          as="a"
          variant="small"
          color="blue-gray"
          className="font-medium"
      >
        <ListItem
            placeholder={undefined}
            className="flex items-center gap-2 py-2 pr-4"
            onClick={() => navigate('/watchlist', {state: {
              email: user.email,
              firstName: user.firstName,
              history: user.history,
              id: user.id,
              lastName: user.lastName,
              watchlist: user.watchlist
            }})}
        >
          Watchlist
        </ListItem>
      </Typography>
      <Typography
        placeholder={undefined}
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem placeholder={undefined} className="flex items-center gap-2 py-2 pr-4">
          Contact Us
        </ListItem>
      </Typography>
    </List>
  );
}

const Header: FC<stateProps> = ({ user }) => {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  const [userLocal, setUserLocal] = useState<any>(user);

  React.useEffect(() => {
    window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const handleSignOut = () => {
    setUserLocal(null);
    localStorage.setItem("isLoggedIn", "false");
    navigate('/');
  };

  return (

        <Navbar placeholder={undefined} className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
          <div className="flex items-center justify-between text-blue-gray-900">
            <div className="hover: cursor-pointer" onClick={() => navigate('/dashboard', { state: {
                                  email: user.email,
                                  firstName: user.firstName,
                                  history: user.history,
                                  id: user.id,
                                  lastName: user.lastName,
                                  watchlist: user.watchlist
                                }
                                })}>
              <img src={tehnime} alt="logo-ct" className="w-10" />
            </div>
            <div className="hidden lg:block">
              <NavList user={user} />
            </div>
            <div className="hidden gap-2 lg:flex">
              <MessageDialog user={user} />

              <Button
                  placeholder={undefined}
                  variant="gradient"
                  size="sm"
                  onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
            <IconButton
                placeholder={undefined}
                variant="text"
                color="blue-gray"
                className="lg:hidden"
                onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                  <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                  <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>
          </div>
          <Collapse open={openNav}>
            <NavList user={user} />
            <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
              <Button
                  placeholder={undefined}
                  variant="gradient"
                  size="sm"
                  fullWidth
                  onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          </Collapse>
        </Navbar>

  );
}

export default Header;