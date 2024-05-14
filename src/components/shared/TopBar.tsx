import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { signOutMutation } from "@/lib/react-query/queriesAndMutations"
import { useEffect } from "react";

const TopBar = () => {
    const { mutate: signOut, isSuccess } = signOutMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess)
            navigate(0);
    }, [isSuccess])

    return (
        <section className="topbar">
            <div className="flex-between py-4 px-5">
                <Link to="/" className="flex gap-3 items-center">
                    <img
                        src="/assets/images/logo.png"
                        alt="logo"
                        height={100}
                        width={100}
                    />
                </Link>

                <Button
                    variant="ghost"
                    className="button-ghost"
                    onClick={() => signOut()}>
                    <img src="/assets/icons/logout.svg" alt="signout" />
                </Button>
            </div>
        </section>
    )
}

export default TopBar