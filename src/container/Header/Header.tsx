import React from 'react'
import './Header.scss'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import MenuIcon from '@mui/icons-material/Menu'

type Props = {}

const Header = (props: Props) => {
    return (
        <>
            <div className="header">
                <div className="movie-list-icon">
                    <MenuIcon />
                </div>
                <div className="header-title">
                    Rate a Movie
                </div>
                <div className="question-icon">
                    <HelpOutlineOutlinedIcon />
                </div>
            </div>
        </>

    )
}

export default Header