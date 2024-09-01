import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from 'react';
import printJS from 'print-js';

const PDFPreviewMenu = ({ downloadUrl }: { downloadUrl: string }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="PDFViewMenu"
                variant="outlined"
                size="small"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <MoreHorizIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                MenuListProps={{
                    'aria-labelledby': 'PDFViewMenu',
                }}>
                <MenuItem
                    onClick={() => {
                        printJS(downloadUrl);
                    }}>
                    <PrintOutlinedIcon />
                    Print
                </MenuItem>
            </Menu>
        </div>
    );
};

export default PDFPreviewMenu;
