--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-05-28 13:20:58

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 4846 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 225 (class 1259 OID 16701)
-- Name: body_data_spots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.body_data_spots (
    id integer NOT NULL,
    instance_id integer,
    timestep integer,
    hex_color character varying(255),
    x_position double precision,
    y_position double precision,
    size double precision,
    body_part character varying(255),
    response_id integer
);


ALTER TABLE public.body_data_spots OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16700)
-- Name: body_data_spots_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.body_data_spots_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.body_data_spots_id_seq OWNER TO postgres;

--
-- TOC entry 4847 (class 0 OID 0)
-- Dependencies: 224
-- Name: body_data_spots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.body_data_spots_id_seq OWNED BY public.body_data_spots.id;


--
-- TOC entry 223 (class 1259 OID 16682)
-- Name: emoji_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.emoji_data (
    id integer NOT NULL,
    instance_id integer,
    emotion character varying(255),
    step text,
    response_id integer
);


ALTER TABLE public.emoji_data OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16681)
-- Name: emoji_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.emoji_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.emoji_data_id_seq OWNER TO postgres;

--
-- TOC entry 4848 (class 0 OID 0)
-- Dependencies: 222
-- Name: emoji_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.emoji_data_id_seq OWNED BY public.emoji_data.id;


--
-- TOC entry 227 (class 1259 OID 16720)
-- Name: freeform_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.freeform_data (
    id integer NOT NULL,
    title character varying,
    value character varying,
    response_id integer,
    "createdAt" date,
    "updatedAt" date
);


ALTER TABLE public.freeform_data OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16719)
-- Name: freeform_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.freeform_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.freeform_data_id_seq OWNER TO postgres;

--
-- TOC entry 4849 (class 0 OID 0)
-- Dependencies: 226
-- Name: freeform_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.freeform_data_id_seq OWNED BY public.freeform_data.id;


--
-- TOC entry 218 (class 1259 OID 16622)
-- Name: instances; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.instances (
    id integer NOT NULL,
    name character varying(255),
    random_id character varying(255),
    owner_id character varying(255),
    "createdAt" date,
    "updatedAt" date
);


ALTER TABLE public.instances OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16642)
-- Name: instances_has_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.instances_has_profiles (
    profile_id character varying(255) NOT NULL,
    instance_id integer NOT NULL
);


ALTER TABLE public.instances_has_profiles OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16621)
-- Name: instances_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.instances_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.instances_id_seq OWNER TO postgres;

--
-- TOC entry 4850 (class 0 OID 0)
-- Dependencies: 217
-- Name: instances_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.instances_id_seq OWNED BY public.instances.id;


--
-- TOC entry 216 (class 1259 OID 16612)
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id character varying(255) NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    email character varying(255),
    role character varying(50),
    "createdAt" date,
    "updatedAt" date
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16734)
-- Name: rating_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rating_data (
    id integer NOT NULL,
    title character varying,
    value character varying,
    response_id integer
);


ALTER TABLE public.rating_data OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16733)
-- Name: rating_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rating_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rating_data_id_seq OWNER TO postgres;

--
-- TOC entry 4851 (class 0 OID 0)
-- Dependencies: 228
-- Name: rating_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rating_data_id_seq OWNED BY public.rating_data.id;


--
-- TOC entry 221 (class 1259 OID 16665)
-- Name: responses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.responses (
    id integer NOT NULL,
    profile_id character varying(255),
    instance_id integer
);


ALTER TABLE public.responses OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16664)
-- Name: responses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.responses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.responses_id_seq OWNER TO postgres;

--
-- TOC entry 4852 (class 0 OID 0)
-- Dependencies: 220
-- Name: responses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.responses_id_seq OWNED BY public.responses.id;


--
-- TOC entry 4655 (class 2604 OID 16704)
-- Name: body_data_spots id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.body_data_spots ALTER COLUMN id SET DEFAULT nextval('public.body_data_spots_id_seq'::regclass);


--
-- TOC entry 4654 (class 2604 OID 16685)
-- Name: emoji_data id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emoji_data ALTER COLUMN id SET DEFAULT nextval('public.emoji_data_id_seq'::regclass);


--
-- TOC entry 4656 (class 2604 OID 16723)
-- Name: freeform_data id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.freeform_data ALTER COLUMN id SET DEFAULT nextval('public.freeform_data_id_seq'::regclass);


--
-- TOC entry 4652 (class 2604 OID 16625)
-- Name: instances id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instances ALTER COLUMN id SET DEFAULT nextval('public.instances_id_seq'::regclass);


--
-- TOC entry 4657 (class 2604 OID 16737)
-- Name: rating_data id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating_data ALTER COLUMN id SET DEFAULT nextval('public.rating_data_id_seq'::regclass);


--
-- TOC entry 4653 (class 2604 OID 16668)
-- Name: responses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.responses ALTER COLUMN id SET DEFAULT nextval('public.responses_id_seq'::regclass);


--
-- TOC entry 4836 (class 0 OID 16701)
-- Dependencies: 225
-- Data for Name: body_data_spots; Type: TABLE DATA; Schema: public; Owner: postgres
--


SELECT pg_catalog.setval('public.body_data_spots_id_seq', 116, true);


--
-- TOC entry 4854 (class 0 OID 0)
-- Dependencies: 222
-- Name: emoji_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.emoji_data_id_seq', 108, true);


--
-- TOC entry 4855 (class 0 OID 0)
-- Dependencies: 226
-- Name: freeform_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.freeform_data_id_seq', 139, true);


--
-- TOC entry 4856 (class 0 OID 0)
-- Dependencies: 217
-- Name: instances_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.instances_id_seq', 22, true);


--
-- TOC entry 4857 (class 0 OID 0)
-- Dependencies: 228
-- Name: rating_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rating_data_id_seq', 93, true);


--
-- TOC entry 4858 (class 0 OID 0)
-- Dependencies: 220
-- Name: responses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.responses_id_seq', 81, true);


--
-- TOC entry 4669 (class 2606 OID 16708)
-- Name: body_data_spots body_data_spots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.body_data_spots
    ADD CONSTRAINT body_data_spots_pkey PRIMARY KEY (id);


--
-- TOC entry 4667 (class 2606 OID 16689)
-- Name: emoji_data emoji_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emoji_data
    ADD CONSTRAINT emoji_data_pkey PRIMARY KEY (id);


--
-- TOC entry 4671 (class 2606 OID 16727)
-- Name: freeform_data freeform_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.freeform_data
    ADD CONSTRAINT freeform_data_pkey PRIMARY KEY (id);


--
-- TOC entry 4663 (class 2606 OID 16646)
-- Name: instances_has_profiles instances_has_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instances_has_profiles
    ADD CONSTRAINT instances_has_profiles_pkey PRIMARY KEY (profile_id, instance_id);


--
-- TOC entry 4661 (class 2606 OID 16631)
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- TOC entry 4659 (class 2606 OID 16620)
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- TOC entry 4673 (class 2606 OID 16741)
-- Name: rating_data rating_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating_data
    ADD CONSTRAINT rating_data_pkey PRIMARY KEY (id);


--
-- TOC entry 4665 (class 2606 OID 16670)
-- Name: responses responses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.responses
    ADD CONSTRAINT responses_pkey PRIMARY KEY (id);


--
-- TOC entry 4680 (class 2606 OID 16709)
-- Name: body_data_spots body_data_spots_instance_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.body_data_spots
    ADD CONSTRAINT body_data_spots_instance_id_fkey FOREIGN KEY (instance_id) REFERENCES public.instances(id);


--
-- TOC entry 4681 (class 2606 OID 16714)
-- Name: body_data_spots body_data_spots_response_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.body_data_spots
    ADD CONSTRAINT body_data_spots_response_id_fkey FOREIGN KEY (response_id) REFERENCES public.responses(id);


--
-- TOC entry 4678 (class 2606 OID 16690)
-- Name: emoji_data emoji_data_instance_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emoji_data
    ADD CONSTRAINT emoji_data_instance_id_fkey FOREIGN KEY (instance_id) REFERENCES public.instances(id);


--
-- TOC entry 4679 (class 2606 OID 16695)
-- Name: emoji_data emoji_data_response_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emoji_data
    ADD CONSTRAINT emoji_data_response_id_fkey FOREIGN KEY (response_id) REFERENCES public.responses(id);


--
-- TOC entry 4682 (class 2606 OID 16728)
-- Name: freeform_data freeform_data_response_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.freeform_data
    ADD CONSTRAINT freeform_data_response_id_fkey FOREIGN KEY (response_id) REFERENCES public.responses(id);


--
-- TOC entry 4675 (class 2606 OID 16652)
-- Name: instances_has_profiles instances_has_profiles_instance_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instances_has_profiles
    ADD CONSTRAINT instances_has_profiles_instance_id_fkey FOREIGN KEY (instance_id) REFERENCES public.instances(id);


--
-- TOC entry 4676 (class 2606 OID 16647)
-- Name: instances_has_profiles instances_has_profiles_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instances_has_profiles
    ADD CONSTRAINT instances_has_profiles_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


--
-- TOC entry 4674 (class 2606 OID 16632)
-- Name: instances instances_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instances
    ADD CONSTRAINT instances_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.profiles(id);


--
-- TOC entry 4683 (class 2606 OID 16742)
-- Name: rating_data rating_data_response_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating_data
    ADD CONSTRAINT rating_data_response_id_fkey FOREIGN KEY (response_id) REFERENCES public.responses(id);


--
-- TOC entry 4677 (class 2606 OID 16676)
-- Name: responses responses_instance_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.responses
    ADD CONSTRAINT responses_instance_id_fkey FOREIGN KEY (instance_id) REFERENCES public.instances(id);


-- Completed on 2024-05-28 13:20:59

--
-- PostgreSQL database dump complete
--

